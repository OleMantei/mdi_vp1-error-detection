<script>
import { mapState } from "pinia";
import { useDataStore } from "../stores/DataStore";
import {
  sortDataItemsByTitle,
  sortDataItemsById,
  sortDataItemsByOutlier,
} from "../data/sortingRule";
import { searchDataItems } from "../data/searchRule";
export default {
  name: "FilterBar",
  data: function () {
    return {
      selectedFiltering: "Ausreißer",
      search: "",
      showVisualizationButton: false,
    };
  },
  computed: {
    ...mapState(useDataStore, ["expensesActual"]),
    ...mapState(useDataStore, ["expensesPlanned"]),
    ...mapState(useDataStore, ["totalDifferenceExpensesActualExpensesPlanned"]),
    ...mapState(useDataStore, [
      "percentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["filteredExpensesActual"]),
    ...mapState(useDataStore, ["filteredExpensesPlanned"]),
    ...mapState(useDataStore, [
      "filteredTotalDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, [
      "filteredPercentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["filtering"]),
    searchItems: function () {
      return searchDataItems(this.expensesActual, this.search);
    },
    listItems: function () {
      var searchTerm = this.search;
      var selectedFiltering = this.selectedFiltering;

      if (selectedFiltering === "Ausreißer") {
        let items = searchDataItems(
          sortDataItemsByOutlier(this.expensesActual),
          searchTerm
        );
        return items;
      }
      if (selectedFiltering === "ID") {
        let items = searchDataItems(
          sortDataItemsById(this.expensesActual),
          searchTerm
        );
        return items;
      }
      if (selectedFiltering === "Titel") {
        let items = searchDataItems(
          sortDataItemsByTitle(this.expensesActual),
          searchTerm
        );
        return items;
      }
      return this.expensesActual();
    },
    areItemsSelected: function () {
      let unsortedFilteredExpensesActual = [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredExpensesActual.push(item);
        }
      });
      return unsortedFilteredExpensesActual.length > 0;
    },
    areNotAllItemsSelected: function () {
      let unsortedFilteredExpensesActual = [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredExpensesActual.push(item);
        }
      });
      let areAllItemsSelected =
        unsortedFilteredExpensesActual.length == this.expensesActual.length;
      return !areAllItemsSelected;
    },
  },
  watch: {
    selectedFiltering() {
      this.showVisualizationButton = true;
    },
  },
  methods: {
    handleEraseAll() {
      if (this.search !== "") {
        this.searchItems.forEach((item) => {
          let expensesActualIndex = this.expensesActual.findIndex(
            (i) => i.id == item.id
          );
          this.expensesActual[expensesActualIndex].checked = false;
        });
      } else {
        this.expensesActual.forEach((item) => {
          item.checked = false;
        });
      }
    },
    handleClickAll() {
      this.showVisualizationButton = true;
      if (this.search !== "") {
        this.searchItems.forEach((item) => {
          let expensesActualIndex = this.expensesActual.findIndex(
            (i) => i.id == item.id
          );
          this.expensesActual[expensesActualIndex].checked = true;
        });
      } else {
        this.expensesActual.forEach((item) => {
          item.checked = true;
        });
      }
    },
    handleVisualizationData() {
      const dataStore = useDataStore();
      let filtering = this.selectedFiltering;
      dataStore.changeFiltering(filtering);

      this.showVisualizationButton = false;

      this.filteredExpensesActual.splice(0, this.filteredExpensesActual.length);
      this.filteredExpensesPlanned.splice(
        0,
        this.filteredExpensesPlanned.length
      );
      this.filteredTotalDifferenceExpensesActualExpensesPlanned.splice(
        0,
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.length
      );
      this.filteredPercentageDifferenceExpensesActualExpensesPlanned.splice(
        0,
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.length
      );

      let unsortedFilteredExpensesActual = [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredExpensesActual.push(item);
        }
      });

      let unsortedFilteredExpensesPlanned = [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredExpensesPlanned.push(
            this.expensesPlanned.find((i) => i.id === item.id)
          );
        }
      });

      let unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned = [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned.push(
            this.totalDifferenceExpensesActualExpensesPlanned.find(
              (i) => i.id === item.id
            )
          );
        }
      });

      let unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned =
        [];
      this.expensesActual.forEach((item) => {
        if (item.checked) {
          unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned.push(
            this.percentageDifferenceExpensesActualExpensesPlanned.find(
              (i) => i.id === item.id
            )
          );
        }
      });

      if (this.selectedFiltering === "Ausreißer") {
        this.filteredExpensesActual.push(
          sortDataItemsByOutlier(unsortedFilteredExpensesActual)
        );
        sortDataItemsByOutlier(unsortedFilteredExpensesActual).forEach(
          (item) => {
            this.filteredExpensesPlanned.push(
              unsortedFilteredExpensesPlanned.find((i) => i.id == item.id)
            );
          }
        );

        sortDataItemsByOutlier(unsortedFilteredExpensesActual).forEach(
          (item) => {
            this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
              unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned.find(
                (i) => i.id == item.id
              )
            );
          }
        );

        sortDataItemsByOutlier(unsortedFilteredExpensesActual).forEach(
          (item) => {
            this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
              unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned.find(
                (i) => i.id == item.id
              )
            );
          }
        );
      }
      if (this.selectedFiltering === "ID") {
        this.filteredExpensesActual.push(
          sortDataItemsById(unsortedFilteredExpensesActual)
        );
        this.filteredExpensesPlanned.push(
          sortDataItemsById(unsortedFilteredExpensesPlanned)
        );
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsById(
            unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned
          )
        );
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsById(
            unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned
          )
        );
      }
      if (this.selectedFiltering === "Titel") {
        this.filteredExpensesActual.push(
          sortDataItemsByTitle(unsortedFilteredExpensesActual)
        );
        this.filteredExpensesPlanned.push(
          sortDataItemsByTitle(unsortedFilteredExpensesPlanned)
        );
        this.filteredTotalDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByTitle(
            unsortedFilteredTotalDifferenceExpensesActualExpensesPlanned
          )
        );
        this.filteredPercentageDifferenceExpensesActualExpensesPlanned.push(
          sortDataItemsByTitle(
            unsortedFilteredPercentageDifferenceExpensesActualExpensesPlanned
          )
        );
      }
    },
  },
};
</script>

<template>
  <div class="filterbar-wrapper">
    <div class="pt-4 pb-4 px-4 filterbar-options">
      <v-text-field
        v-model="search"
        label="Suche"
        hide-details="auto"
        variant="underlined"
        class="mb-4"
      ></v-text-field>
      <v-select
        v-model="selectedFiltering"
        label="Sortierung"
        :items="['Ausreißer', 'ID', 'Titel']"
        variant="underlined"
      ></v-select>
      <v-btn
        v-if="areItemsSelected"
        size="small"
        variant="outlined"
        class="mr-2"
        @click="handleEraseAll"
      >
        zurücksetzen
      </v-btn>
      <v-btn
        v-if="areNotAllItemsSelected"
        size="small"
        variant="outlined"
        @click="handleClickAll"
      >
        alle auswählen
      </v-btn>
    </div>
    <v-divider />
    <div class="filterbar-data-items">
      <v-list
        select-strategy="multiple"
        bg-color="transparent"
        style="margin-bottom: 5rem"
      >
        <v-list-item
          v-for="item in listItems"
          :key="item.id"
          :value="item.id"
          class="px-1"
          variant="plain"
          @click="
            expensesActual.find((i) => i.id === item.id).checked =
              !expensesActual.find((i) => i.id === item.id).checked;
            showVisualizationButton = true;
          "
        >
          <template #prepend>
            <v-list-item-action start>
              <v-checkbox-btn
                v-model="expensesActual.find((i) => i.id === item.id).checked"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
          <v-tooltip
            :text="`${item.id} ${item.title}`"
            open-delay="1200"
            location="bottom"
          >
            <template #activator="{ props }">
              <v-list-item-title v-bind="props"
                >{{ item.id }} {{ item.title }}</v-list-item-title
              >
            </template>
          </v-tooltip>
          <template #append>
            <v-tooltip :text="`Ausreißerscore: ${item.outlierScore}%`">
              <template #activator="{ props }">
                <v-btn
                  :color="item.outlierScoreColor"
                  icon="mdi-information"
                  variant="text"
                  v-bind="props"
                >
                </v-btn>
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list>
      <div
        v-if="showVisualizationButton && areItemsSelected"
        class="filterbar-button-container"
      >
        <v-btn
          class="filterbar-button"
          size="x-large"
          prepend-icon="mdi-chart-timeline-variant"
          color="blue"
          @click="handleVisualizationData"
        >
          Auswahl visualisieren
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style>
.filterbar-wrapper {
  border-right: 1px solid #eeeeee;
  height: calc(100vh - 64px);
}
.filterbar-data-items {
  width: 25rem;
  height: calc(100vh - 260px);
  overflow-y: scroll;
  overflow-x: hidden;
}
.filterbar-button-container {
  position: absolute;
  bottom: 0;
  left: 0;
}
.filterbar-button {
  width: 22rem;
  margin: 2rem 1rem;
}
</style>
