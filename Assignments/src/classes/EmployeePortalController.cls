public with sharing class EmployeePortalController {

    @AuraEnabled
    public static String getUserName() {
        return userinfo.getName();
    }

    @AuraEnabled
    public static Contact getContactDetails() {
        try {
            Id uid = userinfo.getUserId();
            return [select FirstName, LastName, Designation__c, Technology__c, Social_Media_Link__c, Interests__c from Contact where User__c =:uid limit 1];
        } catch(DmlException e) {
            throw new AuraHandledException('Can\'t get user details');
        }
    }
    @AuraEnabled
    public static List<Certificate__c> getCertifications () {
        try {
            Contact c = [select Id from Contact where Name =:userinfo.getName() limit 1];
            return [select Name, Link__c, Valid_Till__c from Certificate__c where Contact__c =: c.Id];
        } catch(DmlException e) {
            throw new AuraHandledException('Can\'t get user details');
        }
    }

    @AuraEnabled
    public static  List<Contact> getEmergencyContacts () {
        try {
            Contact c = [select Id from Contact where Name =:userinfo.getName() limit 1];
            return [select Name, MobilePhone, Email, Relationship__c from Contact where  Emergency_Contacts__c  =: c.Id];
        } catch(DmlException e) {
            throw new AuraHandledException('Can\'t get user details');
        }
    }

    @AuraEnabled
    public static List<Contact> getColleagues (String keyword) {
        keyword += '%';
		return [select Id, Name from Contact where Name like :keyword];
    }

}