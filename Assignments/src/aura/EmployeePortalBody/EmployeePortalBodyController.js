({
	doInit : function (component, event, helper) {
		helper.getDetails(component, "c.getContactDetails");
	},

	PopulateDetails : function(component, event, helper) {
         helper.getDetails(component, event.getParam("method"));
	},

	findColleague : function(component, event, helper) {
		console.log(component.find('keyword').get('v.value'));
		helper.getDetails(component, 'c.getColleagues', [component.find('keyword').get('v.value')]);
	},

	navigateToSObject : function (component, event, helper) {
		var id = event.getSource().get("v.value").Id;
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
		  "recordId": id,
		  "slideDevName": "detail",
		  "isredirect" : true
		});
		navEvt.fire();
	},

	showAddCertificateForm : function(component, event, helper) {
		let contactId = component.get("v.Me.Id");
        $A.createComponent("c:addCertificateModel", {'contactId': contactId},
           function(content, status) {
               if (status === "SUCCESS") {
					component.find('overlayLib').showCustomModal({
						header: "Add Certification",
						body: content,
						showCloseButton: true,
                   });
                }
		});
	},

	showEditCertificateForm : function(component, event, helper) {
		var certificate = event.getSource().get("v.value");
		$A.createComponent("c:addCertificateModel",
			{
				'isNew': false,
				'recordId': certificate.Id,
				// 'newCertificate.Id': certificate.Id,
				// 'newCertificate.Name': certificate.Name,
				// 'newCertificate.Link__c': certificate.Link__c,
				// 'newCertificate.Valid_Till__c': certificate.Valid_Till__c,
				// 'contactId': certificate.Contact__c
			},
           function(content, status) {
               if (status === "SUCCESS") {
					component.find('overlayLib').showCustomModal({
						header: "Add Certification",
						body: content,
						showCloseButton: true,
                   });
                }
		});
	},

	deleteEmergencyContact: function(component, event, helper) {
        let result = confirm("Want to delete?");
        if (result) {
			component.set("v.emergencyContactRecordId", event.getSource().get("v.value"));
            component.find("deleteEmergencyContact").reloadRecord();
        }
	},

	emergencyContactUpdated: function(component, event, helper) {
        component.find("deleteEmergencyContact").deleteRecord($A.getCallback(function(deleteResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
				// record is deleted
				console.log("Record is deleted.");
				// record is deleted, show a toast UI message
				var resultsToast = $A.get("e.force:showToast");
				resultsToast.setParams({
					"title": "Deleted",
					"message": "The record was deleted."
				});
				resultsToast.fire();
				helper.getDetails(component, "c.getEmergencyContacts");
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            }
        }));
	}
})