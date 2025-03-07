// @ts-nocheck
import { readable, derived, writable } from 'svelte/store';
import { csv, autoType, extent } from 'd3';

const dataPath = '../public/data/Titanic-Dataset.csv';

export const dataTitanic = readable([], set => { 
  csv(dataPath, autoType).then(d => set(d));
});

// Definición de filtros activos
export const filters = writable({
  male: true,
  female: true
});

// Datos para barChart por género
export const dataBySurvivingBySex = derived([dataTitanic, filters], ([$dataTitanic, $filters]) => {
  const survivors = $dataTitanic.filter(d => 
    d.Survived === 1 && d.Age !== null && $filters[d.Sex]
  );
  
  const grouped = survivors.reduce((acc, d) => {
    if (!acc[d.Sex]) acc[d.Sex] = { count: 0 };
    acc[d.Sex].count++;
    return acc;
  }, {});

  const processedData = Object.entries(grouped).map(([Sex, values]) => ({
    Sex,
    count: values.count
  }));

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Datos para barChart por víctimas por género
export const dataByVictimsBySex = derived(dataTitanic, $dataTitanic => {
  const victims = $dataTitanic.filter(d => d.Survived === 0);
  
  const grouped = victims.reduce((acc, d) => {
    if (!acc[d.Sex]) acc[d.Sex] = { count: 0 };
    acc[d.Sex].count++;
    return acc;
  }, {});

  const processedData = Object.entries(grouped).map(([Sex, values]) => ({
    Sex,
    count: values.count
  }));

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Datos para barChart por puerto de embarque
export const dataBySurvivingByEmbarked = derived(dataTitanic, $dataTitanic => {
  const survivors = $dataTitanic.filter(d => d.Survived === 1 && d.Embarked !== null);

  const grouped = survivors.reduce((acc, d) => {
    const key = `${d.Embarked}-${d.Sex}`;
    if (!acc[key]) acc[key] = { Puerto: d.Embarked, Sex: d.Sex, count: 0 };
    acc[key].count++;
    return acc;
  }, {});

  const processedData = Object.values(grouped);

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});

// Rango de edades (para escalas en gráficos)
export const ageExtent = derived(dataTitanic, $dataTitanic => 
  extent($dataTitanic.map(d => d.Age).filter(age => age !== null))
);

// Datos para gráfica de líneas: Supervivientes por edad y género
export const dataBySurvivingBySexAndAge = derived([dataTitanic, filters], ([$dataTitanic, $filters]) => {
  const survivors = $dataTitanic.filter(d => 
    d.Survived === 1 && d.Age !== null && $filters[d.Sex]
  );

  // Agrupar por edad y género
  const grouped = survivors.reduce((acc, d) => {
    const key = `${d.Sex}-${d.Age}`;
    if (!acc[key]) acc[key] = { Sex: d.Sex, age: d.Age, count: 0 };
    acc[key].count++;
    return acc;
  }, {});

  // Convertir a array y ordenar por edad
  const processedData = Object.values(grouped).sort((a, b) => a.age - b.age);

  return {
    data: processedData,
    total: processedData.reduce((sum, item) => sum + item.count, 0)
  };
});