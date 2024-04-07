const BloodDonor = artifacts.require("BloodDonor");

module.exports = function(deployer) {
  deployer.deploy(BloodDonor);
};
