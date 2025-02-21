<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText"/>
        </div>
        <div class="mt-3 col-md-6">
            <h4>Danh bạ <i class="fas fa-address-book"></i></h4>
            <ContactList
                :contacts="filteredContacts"
                v-if="filteredContactsCount > 0"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có liên hệ nào</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList">
                    <i class="fa-solid fa-arrows-rotate"></i>
                    Làm mới                
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllContacts"
                >
                    <i class="fa-solid fa-trash"></i>
                    Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <h4>Chi tiết liên hệ <i class="fas fa-address-card"></i></h4>
                <ContactCard :contact="activeContact"/>
                <router-link
                    :to="{
                        name: 'contact.edit',
                        params: { id: activeContact._id }
                    }"
                >
                <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit"/> Hiệu chỉnh
                </span>
            </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue';
import ContactCard from '@/components/ContactCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import contactService from '@/services/contact.service';



export default {
    components: {
        ContactList,
        ContactCard,
        InputSearch
    },
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: ''
        };
    },
    watch:{
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        contactString() {
            return this.contacts.map((contact) => {
                const {name, email, address, phone} = contact;
                return `${name} ${email} ${address} ${phone}`;
            });
        },
        filteredContacts() {
            if(!this.searchText) return this.contacts;
            return this.contacts.filter((_contact, index) => {
                this.contactString[index].includes(this.searchText);
            });
        },
        activeContact() {
            if(this.activeIndex <0 ) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        }
    },
    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await contactService.getAll();
            } catch (error) {
                console.error(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        async removeAllContacts() {
            if (confirm('Bạn có chắc chắn muốn xóa tất cả liên hệ?')) {
                try {
                    await contactService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.error(error);
                }
            }
        },
        goToAddContact() {
            this.$router.push({name: 'contact.add'});
        }
    },
    mounted() {
        this.refreshList();
    }
}
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>