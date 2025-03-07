<script>
  import { filters } from './../stores_titanic.js';

  function toggleFilter(key) {
    filters.update(f => ({ ...f, [key]: !f[key] }));
  }
</script>

<div class="filters">
  <div class="filter-group">
    <h3>Filtrar por Sexo:</h3>
    
    <label>
      <input type="checkbox" bind:checked={filters.female} on:change={() => toggleFilter("male")} />
      Mujer
    </label>
    
    <label>
      <input type="checkbox" bind:checked={filters.male} on:change={() => toggleFilter("female")} />
      Hombre
    </label>
  </div>
</div>

<style>
  .filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    background: #317e46;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 200px;
    height: 200px;
  }

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight:bolder;
  }
</style>
