<script>
// @ts-nocheck

  import Filtros from './lib/Filtros.svelte';
  import VicPorSexo from './lib/VicPorSexo.svelte';
  import SupPorPuerto from './lib/SupPorPuerto.svelte';
  import SupPorSexo from './lib/SupPorSexo.svelte';
</script>

<main>
  <div class="content">

  <div class="ladoIzquierdo">
    <h1>
      Dasboard
      Titanic
    </h1>
    
  
  <Filtros />

  <img src="/public/logoTitanic.png" alt="Descripción de la imagen" />
  </div>
  <section class="charts">
    
    <SupPorPuerto />
    <VicPorSexo /> 
    <SupPorSexo />
     
  </section>
  </div>

  
</main>

<style>
  img{
    width: 50%;
  }
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #FFC300;
    min-height: 65vh;
    padding: 10px;

    border-radius: 10px;
    
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

</style>