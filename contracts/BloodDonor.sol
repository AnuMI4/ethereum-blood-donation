// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BloodDonor {
    // Structure to represent a donor
    struct Donor {
        string firstName; // First name of the donor
        string lastName; // Last name of the donor
        uint dob; // Date of birth of the donor (Unix timestamp)
        uint weight; // Weight of the donor in kilograms
        uint lastDonationTimestamp; // Timestamp of the last donation
        bool isEligible; // Flag to indicate donor eligibility
    }

    // Mapping of donor addresses to donor details
    mapping(address => Donor) public donors;

    // Function to set the weight for a donor
    function setWeight(uint _weight) external {
        donors[msg.sender].weight = _weight;
    }

    // Function to set the date of birth for a donor
    function setDOB(uint _dob) external {
        require(_dob <= block.timestamp, "Date of birth cannot be in the future");
        donors[msg.sender].dob = _dob;
    }

    // Function to check donor eligibility
    function checkEligibility() external view returns (bool) {
        // Retrieve donor details
        Donor storage donor = donors[msg.sender];

        // Check eligibility criteria
        if (donor.weight >= 50) {
            // Eligibility criteria met, update donor status and return true
            return true;
        } else {
            // Not eligible, return false
            return false;
        }
    }
}
