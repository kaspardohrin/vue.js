// code handling data within the #app
new Vue({
  el: '#app',

  data() {
    return {contacts: null}
  },

  mounted() {
    // axios.get('http://188.166.125.128:3000/api/contacts').then(response => (this.contacts = response.data.items))
    axios.get('http://localhost:3001/contacts/').then(response => (this.contacts = response.data.items))
  }
})


// code handling data within the #contact-create
Vue.component('contact-create', {
  data() {
    return {name: null, email: null, phone: null, error: '', success: ''}
  },

  methods: {
    // create-function: creating the contact-view
    submit: function() {
      if(!this.name || !this.email || !this.phone) {
        this.error = 'fill out everything..'
        this.success = ''
      } else {
        data = {name: this.name, email: this.email, phone: this.phone}

        // fetch('http://188.166.125.128:3000/api/contacts/', {
        fetch('http://localhost:3001/contacts/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          mode: 'cors',
          body: JSON.stringify(data)
        }).then(() => {this.name = '', this.email = '', this.phone = '', this.error = '', this.success = 'contact added'})
      }    
    }
  },
  template: '#contact-create'
})
new Vue({el: '#contact-create'})


// code handling data within the #contact-view
Vue.component('contact-view', {
  data() {
    return {expanded: false, deleted: false, state: false, text: 'open'}
  },

  methods: {
    // toggle-function: collapsing/expaning contact-view
    expand: function() {
      this.expanded = !this.expanded
      this.state = !this.state
      if (this.state) {
        this.text = 'close'
      } else {
        this.text = 'open'
      }
    },

    // delete-function: deleting the contact-view
    deleteContact: function() {
      fetch('http://localhost:3001/contacts/' + this.contactId, {
      // fetch('http://188.166.125.128:3000/api/contacts/' + this.contactId, {
        method: 'DELETE'
      }).then(() => {this.deleted = true})
    },

    // edit-function: editing the contact-view
    editContact: function() {
      console.log("im attempting to put..")
      if(!this.contactName || !this.contactEmail || !this.contactPhone) {
        console.log("can't leave fields empty..")
      } else {
        data = {name: this.contactName, email: this.contactEmail, phone: this.contactPhone}
        
        fetch('http://localhost:3001/contacts/' + this.contactId, {
        // fetch('http://188.166.125.128:3000/api/contacts/' + this.contactId, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }).then(() => {console.log("..contact succesfully edited")})
      }
    }
  },
  props: ['contactId', 'contactName', 'contactEmail', 'contactPhone'],
  template: '#contact-view'
})
new Vue({el: '#contact-view'})