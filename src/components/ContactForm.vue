<template>
    <Form @submit="submitContact" :validation-schema="contactFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field type="text" name="name" class="form-control" v-model="contactLocal.name"/>
            <ErrorMessage name="name" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field type="email" name="email" class="form-control" v-model="contactLocal.email"/>
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field type="text" name="address" class="form-control" v-model="contactLocal.address"/>
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field type="tel" name="phone" class="form-control" v-model="contactLocal.phone"/>
            <ErrorMessage name="phone" class="error-feedback"/>
        </div>
        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite"/>
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-ìf="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
                Xóa
            </button>
            <button type="button" class="ml-2 btn btn-secondary" @click="Cancel">
                Thoát
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default{
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ['submit:contact', 'delete:contact'],
    props: {
        contact: { type: Object, required: true }
    },
    data() {
        const contactFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên phải có giá trị')
                .min(2, 'Tên phải có ít nhất 2 ký tự')
                .max(50, "Tên không được quá 50 ký tự"),
            email: yup
                .string()
                .email('Email không đúng')
                .max(50, 'Email tối đa 50 ký tư'),
            address: yup
                .string()
                .max(100, 'Địa chỉ tối đa 100 ký tự'),
            phone: yup 
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ"
                )
        });
        return {
            contactLocal: this.contact,
            contactFormSchema
        }
    },
    methods: {
        submitContact() {
            this.$emit("submit:contact", this.contactLocal);
        },
        deleteContact() {
            this.$emit("delete:contact", this.contactLocal.id);
        },
        Cancel() {
            const reply = window.confirm('You have unsaved changes. Are you sure you want to leave?');
            if (!reply) {
                return false
            } else this.$router.push({ name: 'contactbook'});
        }
    },
};
</script>

<style scoped>
@import '@/assets/form.css';
</style>