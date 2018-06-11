({
    validateCertificateForm: function(component) {
         // Show error messages if required fields are blank
        var allValid = component.find('CertificateField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);

		return allValid;
	}

})