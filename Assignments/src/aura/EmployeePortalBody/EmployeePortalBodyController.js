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
	}
})