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
