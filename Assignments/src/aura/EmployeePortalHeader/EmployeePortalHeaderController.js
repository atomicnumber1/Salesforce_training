({
	doInit: function(component){
		var currentHour = new Date().getHours();
        var greeting;
        
        if (currentHour < 12)
            greeting = 'morning';
        else if (currentHour >= 12 && currentHour < 17)
            greeting = 'afternoon';
        else
            greeting = 'evening';

    	component.set('v.greeting', `Good ${greeting} `);
        
        var action = component.get("c.getUserName");
        action.setCallback (this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS")
                component.set('v.name', response.getReturnValue());
            	
        });
        $A.enqueueAction(action);          
    }
})