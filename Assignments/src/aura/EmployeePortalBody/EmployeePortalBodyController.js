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
	}
})