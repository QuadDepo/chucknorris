<template>
  <div class="checkbox-group">
      <div class="row">
        <div class="col-xs-6 col-md-3" v-for="column, i in checkboxColumns" :key="i">
          <div class="checkbox" v-for="option in column" :key="option">
            <input @click="() => toggleCheckbox(option)" type="checkbox" :id="option" :name="option" :checked="checkedOptions.includes(option)">
            <label :for="option">{{option}}</label>
          </div>
        </div>
      </div>

      <div class="checkbox-group__footer">
        <div class="row start-xs">
          <div class="col-xs-12">
            <Button @click="toggleAll" :type="['outline','text']">{{checkAllLabel}}</Button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Button from '../Button';

export default {
  name: "CheckboxGroup",
  components: {
    Button
  },
  data: function() { return {
    checkedOptions: [],
    column: 4,
  }},
  props: {
    defaultChecked: {
      required: false,
      type: [Array, String],
      default: () => ([])
    },
    options: {
      required: false,
      type: Array,
      default: () => ([
        "animal",
        "career",
        "celebrity",
        "dev",
        "explicit",
        "fashion",
        "food",
        "history",
        "money",
        "movie",
        "music",
        "political",
        "religion",
        "science",
        "sport",
        "travel"
      ])
    },
  },

  computed: {
    checkAllLabel: function () {
      return this.options.length === this.checkedOptions.length ? 'Uncheck all' : 'Check all'
    },

    checkboxColumns: function() { 
      // Create columns of the checkboxes for display purposes
      return [...this.options.keys()].map(c => this.options.filter((_, i) => i % this.column === c)).filter(item => item.length > 0);
    },

    getCheckedOptions() {
      return this.checkedOptions;
    }
  },

  watch: {
    checkedOptions() {
      this.$emit('onCheck', this.checkedOptions);
    },
  },

  methods: {
    toggleCheckbox(option) {
      // Check if option is already in option list
      if (this.checkedOptions.includes(option)) {
        this.checkedOptions = this.checkedOptions.filter(item => item !== option);
        return;
      }

      this.checkedOptions.push(option);
      this.$emit('onCheck', this.checkedOptions);
    },

    toggleAll() {
      // If label contain unchecked remove all selected option other wise add all of them
      if (this.checkAllLabel.includes('Uncheck')) {
        this.checkedOptions = []
        return;
      }

      this.checkedOptions = [...this.options];
    }
  },

  mounted() {
    console.log(this.defaultChecked);
    this.checkedOptions = [...this.defaultChecked];
  }
};
</script>

<style lang="scss" scoped>
  .checkbox-group {
    width: 100%;

    .row {
      width: 100%;
    }

    .checkbox {
      display: flex;
      margin-right: 2rem;

      & + .checkbox {
        margin-top: .5rem;
        // @Fix for mobile to do the same margin
      }

      label {
        margin-left: .2rem;
      }
    }

    &__footer {
      margin-top: 1rem;
      width: 100%;
    }
  }
</style>
