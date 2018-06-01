({
    callMethod : function(method) {
        var navbarEvent = $A.get("e.c:NavbarEvent");		
        navbarEvent.setParam("method", 'c.' + method);
        navbarEvent.fire();
    }
})