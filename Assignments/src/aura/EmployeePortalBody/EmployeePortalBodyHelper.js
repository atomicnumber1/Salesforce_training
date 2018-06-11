({

    getDetails : function(component, actionMethod, args) {
        var action = component.get(actionMethod);
        if (args && args.length > 0) {
            action.setParams({'keyword': args[0]});
        }
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                this.setDetails(component, actionMethod, response.getReturnValue());
            } else if (state === 'ERROR'){
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error(errors[0].message);
                    }
                } else {
                    console.error("Unknown error");
                }
            } else {
                console.error('Something went wrong, Please check with your admin');
            }
        });
        $A.enqueueAction(action);
    },
    setDetails : function(component, method, data) {
        switch(method) {
            case 'c.getContactDetails':
                this.populateContactDetails(component, data);
                break;
            case 'c.getCertifications':
                this.populateCertifications(component, data);
                break;
            case 'c.getEmergencyContacts':
                this.populateEmergencyContacts(component, data);
                break;
            case 'c.getColleagues':
                this.populateColleagues(component, data);
                break;
            default:
                console.error("Invalid Method");
                break;
        }
    },
    populateContactDetails : function(component, data) {
        component.set("v.display", 'Personal Details');
        component.set("v.Me", data);
    	console.log(data);
	},
    populateCertifications : function(component, data) {
        component.set("v.display", 'Certifications');
        component.set("v.Cert", data);
    	console.log(data);
	},
    populateEmergencyContacts : function(component, data) {
        component.set("v.display", 'Emergency Contacts');
        component.set("v.EmCon", data);
     	console.log(data);
    },
    populateColleagues : function (component, data) {
        component.set("v.display", 'Colleagues');
        component.set("v.Colleague", data);
        console.log(data);
    }
})