<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title class="ml-2">Create Student Record</v-card-title>
              <v-card-text>
                <v-container fluid>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="student.fname"
                        :rules="requiredRules"
                        label="First Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="student.mname"
                        :rules="requiredRules"
                        label="Middle Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="student.lname"
                        :rules="requiredRules"
                        label="Last Name"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="student.age"
                        :rules="requiredRules"
                        label="Age"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="student.civilStatus"
                        :rules="requiredRules"
                        label="Civil Status"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mt-0">
                    <v-col cols="5">
                      <v-text-field
                        v-model="student.address"
                        :rules="requiredRules"
                        label="Address"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="student.phone"
                        :rules="requiredRules"
                        label="Phone"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-menu
                        v-model="birthDateMenu"
                        :close-on-content-click="true"
                        :nudge-left="20"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="student.birthDate"
                            label="Date of Birth"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            flat
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="student.birthDate"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="2">
                      <v-select
                        v-model="student.gender"
                        :rules="requiredRules"
                        :items="['Male', 'Female']"
                        label="Gender"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        v-model="student.guardian"
                        :items="parents"
                        label="Select Guardian"
                        item-text="fullname"
                        outlined
                        return-object
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container fluid>
                  <v-row align="center" justify="end">
                    <v-btn
                      color="success"
                      class="mr-4 ml-5"
                      x-large
                      @click="validate"
                    >
                      Save Record
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="success"
      :right="true"
      :top="true"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    birthDateMenu: null,
    issuedAtMenu: null,
    issuedOnMenu: null,
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        href: "dashboard",
      },
      {
        text: "Add Student Record",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
    valid: true,
    name: "",
    requiredRules: [(v) => !!v || "This field is required"],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    search: "",
    student: {
      fname: "",
      mname: "",
      lname: "",
      address: "",
      birthDate: "",
      age: 0,
      gender: "Male",
      civilStatus: "",
      phone: "",
      guardian: {},
    },
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
    ],
  }),
  computed: {
    ...mapGetters(["relatedCase", "parents"]),
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetchUsers", "addStudent", "searchCase"]),
    setVerified() {
      this.clearance.verified = !this.clearance.verified;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        const param = {
          fname: this.student.fname,
          mname: this.student.mname,
          lname: this.student.lname,
          address: this.student.address,
          birthDate: this.student.birthDate,
          age: this.student.age,
          gender: this.student.gender,
          civilStatus: this.student.civilStatus,
          phone: this.student.phone,
          parentId: this.student.guardian.id,
          parentName: this.student.guardian.fullname,
          parentPhone: this.student.guardian.phone,
        };
        console.log("PARAM", param);
        this.addStudent(param);
        this.$refs.form.reset();
        this.snackbar = true;
        this.snackbarText = "Student Record Created!";
        this.$router.replace({ name: "navigation.dashboard" });

        this.$swal({
          position: "center",
          icon: "success",
          title: "Student Record Created!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    selectIdPicture(file) {
      this.clearance.idPicture = file;
    },
    selectedBarangayClearance(file) {
      this.clearance.barangayClearance = file;
    },
    selectedCedula(file) {
      this.clearance.cedula = file;
    },
    selectedOrt(file) {
      this.clearance.ort = file;
    },
    toFormData(obj) {
      var fd = new FormData();
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    },
    searchCrimeCase() {
      this.searchCase(this.search);
    },
    dateTimeFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style></style>
