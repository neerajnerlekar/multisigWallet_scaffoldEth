//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	event Deposit(address indexed sender, uint256 amount);
	event Submit(uint256 indexed txId);
	event Approve(address indexed owner, uint256 indexed txId);
	event Revoke(address indexed owner, uint256 indexed txId);
	event Execute(uint256 indexed txId);

	// Transaction structure
	struct Transaction {
		address to;
		uint256 value;
		bytes data;
		bool executed;
	}

	address[] public owners;
	mapping(address => bool) public isOwner;
	uint256 public numConfirmationsRequired;

	Transaction[] public transactions;

	// Mapping to keep track of the confirmations for each transaction
	mapping(uint256 => mapping(address => bool)) public confirmations;

	// modifiers
	modifier onlyOwner() {
		require(isOwner[msg.sender], "Not owner");
		_;
	}

	modifier txExists(uint256 _txId) {
		require(_txId < transactions.length, "Transaction does not exist");
		_;
	}

	modifier notExecuted(uint256 _txId) {
		require(!transactions[_txId].executed, "Transaction already executed");
		_;
	}

	modifier notConfirmed(uint256 _txId) {
		require(
			!confirmations[_txId][msg.sender],
			"Transaction already confirmed"
		);
		_;
	}

	// Constructor
	constructor(address[] memory _owners, uint256 _numConfirmationsRequired) {
		require(_owners.length > 0, "Owners required");
		require(
			_numConfirmationsRequired > 0 &&
				_numConfirmationsRequired <= _owners.length,
			"Invalid number of confirmations"
		);

		for (uint256 i = 0; i < _owners.length; i++) {
			address owner = _owners[i];

			require(owner != address(0), "Invalid owner");
			require(!isOwner[owner], "Owner not unique");

			isOwner[owner] = true;
			owners.push(owner);
		}

		numConfirmationsRequired = _numConfirmationsRequired;
	}

	receive() external payable {
		emit Deposit(msg.sender, msg.value);
	}

	// Function to submit a transaction
	function submit(
		address _to,
		uint256 _value,
		bytes memory _data
	) public onlyOwner {
		transactions.push(
			Transaction({
				to: _to,
				value: _value,
				data: _data,
				executed: false
			})
		);

		emit Submit(transactions.length - 1);
	}

	// Function to approve a transaction
	function approve(
		uint256 _txId
	) public onlyOwner txExists(_txId) notExecuted(_txId) notConfirmed(_txId) {
		confirmations[_txId][msg.sender] = true;
		emit Approve(msg.sender, _txId);
	}

	// Function to get the number of confirmations for a transaction
	function _getConfirmationCount(
		uint256 _txId
	) private view returns (uint256 count) {
		for (uint256 i = 0; i < owners.length; i++) {
			if (confirmations[_txId][owners[i]]) {
				count += 1;
			}
		}
	}

	// Function to execute a transaction
	function execute(
		uint256 _txId
	) public onlyOwner txExists(_txId) notExecuted(_txId) {
		require(
			_getConfirmationCount(_txId) >= numConfirmationsRequired,
			"not enough confirmations"
		);

		Transaction storage transaction = transactions[_txId];
		transaction.executed = true;

		(bool success, ) = transaction.to.call{ value: transaction.value }(
			transaction.data
		);
		require(success, "Transaction failed");

		emit Execute(_txId);
	}

	// Function to revoke a confirmation
	function revoke(
		uint256 _txId
	) public onlyOwner txExists(_txId) notExecuted(_txId) {
		confirmations[_txId][msg.sender] = false;
		emit Revoke(msg.sender, _txId);
	}

	// Getter Functions

	function getOwners() public view returns (address[] memory) {
		return owners;
	}

	function getTransactions() public view returns (Transaction[] memory) {
		return transactions;
	}
}
