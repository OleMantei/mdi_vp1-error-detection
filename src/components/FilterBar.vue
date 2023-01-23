<script>
import {
  getFilteredExpensesActual,
  getFilteredExpensesPlanned,
  getFilteredTotalDifferenceExpensesActualExpensesPlanned,
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned,
} from "../data/dataService";
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
      select: "Ausreißer",
      filteredExpensesActual: getFilteredExpensesActual(),
      filteredExpensesPlanned: getFilteredExpensesPlanned(),
      filteredTotalDifferenceExpensesActualExpensesPlanned:
        getFilteredTotalDifferenceExpensesActualExpensesPlanned(),
      filteredPercentageDifferenceExpensesActualExpensesPlanned:
        getFilteredPercentageDifferenceExpensesActualExpensesPlanned(),
      selectedFiltering: "Ausreißer",
      search: "",
      selectedItems: [],
    };
  },
  computed: {
    listItems: function () {
      var searchTerm = this.search;
      var selectedFiltering = this.selectedFiltering;

      if (selectedFiltering === "Ausreißer") {
        return searchDataItems(
          sortDataItemsByOutlier(this.filteredExpensesActual),
          searchTerm
        );
      }
      if (selectedFiltering === "ID") {
        return searchDataItems(
          sortDataItemsById(this.filteredExpensesActual),
          searchTerm
        );
      }
      if (selectedFiltering === "Titel") {
        return searchDataItems(
          sortDataItemsByTitle(this.filteredExpensesActual),
          searchTerm
        );
      }
      return getFilteredExpensesActual();
    },
  },
};
</script>

<template>
  <div class="filterbar-wrapper bg-blue">
    <div class="pt-4 px-4">
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
    </div>
    <v-list select-strategy="multiple" bg-color="transparent">
      <v-list-item
        v-for="(item, index) in listItems"
        :key="{ index }"
        :value="item.id"
        class="px-1"
        variant="plain"
      >
        <template #prepend="{ isActive }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
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
                alt="moin"
                v-bind="props"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<style>
.filterbar-wrapper {
  width: 25rem;
  height: 100%;
}
</style>
