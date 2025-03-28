
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useContacts } from "@/hooks/useContacts";
import ContactsList from "@/components/contacts/ContactsList";
import CreateContactButton from "@/components/contacts/CreateContactButton";
import ContactsFilter from "@/components/contacts/ContactsFilter";
import ContactDetail from "@/components/contacts/ContactDetails";

const ContactsModule: React.FC = () => {
  const {
    contacts,
    selectedContact,
    isLoading,
    filteredContacts,
    setSelectedContactId,
    addContact,
    updateContact,
    deleteContact,
    addActivity,
    filterContacts,
    clearFilters,
  } = useContacts();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Contacts</h2>
          <p className="text-muted-foreground">Manage your contacts and leads</p>
        </div>

        <div className="flex items-center gap-2">
          <CreateContactButton onSave={addContact} />
        </div>
      </div>

      <ContactsFilter onFilter={filterContacts} onClear={clearFilters} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Contacts</CardTitle>
              <CardDescription>
                {filteredContacts.length} contacts
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ContactsList
                contacts={filteredContacts}
                isLoading={isLoading}
                selectedContactId={selectedContact?.id}
                onSelectContact={setSelectedContactId}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedContact ? (
            <ContactDetail
              contact={selectedContact}
              onUpdateContact={updateContact}
              onDeleteContact={deleteContact}
              onAddActivity={addActivity}
            />
          ) : (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Contact Selected</h3>
                <p className="text-muted-foreground">
                  Select a contact from the list to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsModule;
