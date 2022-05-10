<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h6">SICAT College | Subjects</v-card-title>
          <v-card-subtitle>List of Subjects</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-toolbar flat>
            <v-container fluid>
              <v-row>
                <v-col md="4" xs="4" sm="4" lg="6">
                  <v-btn color="primary" dark @click="dialog = true"
                    >Add Subject</v-btn
                  >
                </v-col>
                <v-col md="8" xs="8" sm="8" lg="6">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search Subject"
                    single-line
                    style="margin-top: 10px"
                    hide-details
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-toolbar>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="allSubject"
              loading-text="Loading... Please wait"
              no-results-text="No Available Article"
              class="elevation-0"
              :search="search"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn color="warning" @click="editItem(item)" small
                  >Edit</v-btn
                >
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ dateTimeFormat(item.createdAt) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="650">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Subject
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="subject.code"
                    :rules="requiredRules"
                    label="Subject Code"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="subject.unit"
                    :rules="requiredRules"
                    label="Unit"
                    required
                    outlined
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="12">
                  <v-text-field
                    v-model="subject.description"
                    :rules="requiredRules"
                    label="Subject Description"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog = false"> Close </v-btn>
          <v-btn color="success" text @click="validate"> Save case </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" width="650">
      <template v-slot:activator="{ on, attrs }"> </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update Subject
        </v-card-title>

        <v-card-text>
          <v-form ref="editForm" v-model="validEdit" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="currentSubject.code"
                    :rules="requiredRules"
                    label="Subject Code"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="currentSubject.unit"
                    :rules="requiredRules"
                    label="Unit"
                    type="number"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="12">
                  <v-text-field
                    v-model="currentSubject.description"
                    :rules="requiredRules"
                    label="Subject Description"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            text
            @click="[(editDialog = false), (subject = {})]"
          >
            Close
          </v-btn>
          <v-btn color="success" text @click="editValidate">
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    dialog: false,
    editDialog: false,
    search: "",
    totalArticles: 0,
    items: [
      { label: "All", count: 0 },
      { label: "Verified", count: 0 },
    ],
    subject: {
      code: "",
      description: "",
      unit: 1,
    },
    currentSubject: {},
    headers: [
      {
        text: "Actions",
        value: "actions",
        align: "start",
        sortable: false,
        width: 100,
      },
      {
        text: "Subject Code",
        value: "code",
      },
      { text: "Subject Description", value: "description" },
      { text: "Unit", value: "unit" },
      { text: "Created at", value: "createdAt" },
    ],
    valid: true,
    validEdit: true,
    requiredRules: [(v) => !!v || "This field is required"],
  }),
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["fetchSubject", "addSubject", "updateSubject"]),
    editItem(item) {
      this.currentSubject = item;
      this.editDialog = true;
    },
    downloadItem(item) {
      console.log(item);
    },
    dateFormat(date) {
      return new Date(date).toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
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
    setBadge() {
      this.items[0].count = this.count;
    },
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.addSubject(this.subject);
        this.$refs.form.reset();
        this.snackbar = true;
        this.snackbarText = "Criminal Case Created!";
        this.dialog = false;
      }
    },
    editValidate() {
      const valid = this.$refs.editForm.validate();
      if (valid) {
        this.updateSubject(this.currentSubject);
        this.snackbar = true;
        this.snackbarText = "Criminal Case Updated!";
        this.editDialog = false;
      }
    },
  },
  computed: {
    ...mapGetters(["allSubject"]),
  },
  created() {
    this.setBadge();
  },
  mounted() {
    this.fetchSubject();
  },
};
</script>

<style></style>
