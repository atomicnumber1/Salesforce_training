global class BatchUpdateContact implements Database.Batchable<sObject>{
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([SELECT Firstname,Lastname from Contact]);
    }

    global void execute(Database.BatchableContext bc, List<contact> contacts) {
        for(Contact c : contacts)
            c.FirstName.capitalize();

        try {
            update Contacts;
        } catch (DmlException e) {
            System.debug('Got DmlException while updating contacts: ' + e.getMessage());
        }
        
    } 

    global void finish(Database.BatchableContext bc) {
        System.debug('Done with Capitalizing Contact\'s First Name');
    } 
}