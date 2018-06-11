({
    doInit: function(component, event, helper) {
        let isNew = component.get("v.isNew");
        if (isNew) {
            // Prepare a new record from template
            component.find("CertificateRecordCreator").getNewRecord(
                "Certificate__c", // sObject type (objectApiName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    var rec = component.get("v.newCertificate");
                    var error = component.get("v.newCertificateError");
                    if(error || (rec === null)) {
                        console.log("Error initializing record template: " + error);
                        return;
                    }
                    console.log("Record template initialized: " + rec.sobjectType);
                })
            );
        }
    },

    handleSaveCertificate: function(component, event, helper) {
        if(helper.validateCertificateForm(component)) {
            let isNew = component.get("v.isNew");
            if (isNew){
                component.set("v.newCertificate.Id", component.get("v.recordId"));
                component.set("v.newCertificate.Contact__c", component.get("v.contactId"));
            }
            component.find("CertificateRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
					resultsToast.fire();

                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving Certificate, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    },

    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "LOADED") {
           // record is loaded (render other component which needs record data value)
            console.log("Record is loaded successfully.");
        } else if(eventParams.changeType === "CHANGED") {
            // record is changed
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving, or deleting the record
        }
    }

})