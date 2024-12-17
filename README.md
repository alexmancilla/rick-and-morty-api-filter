# rick-and-morty-api-filter

Este proyecto tiene como objetivo crear una función en JavaScript que consuma una API REST para obtener una lista de personajes de la serie  **Rick and Morty** , realice un filtrado de los personajes vivos, reemplace los espacios en sus nombres por guiones bajos y muestre los resultados en consola.

## Objetivos

1. **Consumo de API** : Consumir la API REST de **Rick and Morty** para obtener la lista de personajes.
2. **Filtrado de Datos** : Filtrar los personajes vivos utilizando el campo `status`.
3. **Manipulación de Nombres** : Modificar los nombres de los personajes reemplazando los espacios por guiones bajos.
4. **Presentación de Resultados** : Mostrar en consola los nombres de los personajes vivos con los nombres modificados.

## Requisitos

* Usar el método `fetch` o cualquier otra alternativa para realizar peticiones a la API REST.
* Filtrar la lista de personajes para incluir solo aquellos con el estado  **"Alive"** .
* Modificar los nombres de los personajes reemplazando los espacios en blanco por guiones bajos.
* Mostrar en consola los resultados con los nombres modificados.

## Estructura Esperada

Se espera que la solución entregue un archivo JSON con la siguiente estructura:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">json</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-json">{
	"results": [
		{ "id": 1, "name": "Rick_Sanchez", "status": "Alive", "gender": "Male" },
		{ "id": 2, "name": "Morty_Smith", "status": "Alive", "gender": "Male" },
		{ "id": 3, "name": "Beth_Smith", "status": "Alive", "gender": "Female" },
		{ "id": 4, "name": "Jerry_Smith", "status": "Dead", "gender": "Male" },
		{ "id": 5, "name": "Summer_Smith", "status": "Dead", "gender": "Female" }
	]
}
</code></div></div></pre>

## Desarrollo

### Clases Principales

* **Character** : Esta clase representa a un personaje con atributos como `id`, `name`, `status`, y `gender`. También incluye un método `isAlive` para verificar si el personaje está vivo.
* **CharacterAPI** : Esta clase se encarga de interactuar con la API para obtener los personajes, filtrar los vivos y modificar sus nombres según las especificaciones.

## Testing

Para asegurar el correcto funcionamiento del código, se ha implementado una prueba unitaria utilizando Jest que simula una respuesta de la API. Esta prueba valida que solo se devuelvan los personajes vivos y que los nombres se modifiquen correctamente:

<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">javascript</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center"><div class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span class="" data-state="closed"><button class="flex gap-1 items-center select-none py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copiar código</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="!whitespace-pre hljs language-javascript">test('CharacterAPI should only return alive characters and replace spaces with underscores in names', async () => {
  const mockFetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        results: [
          { id: 1, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
          { id: 2, name: 'Morty Smith', status: 'Alive', gender: 'Male' },
          { id: 3, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
          { id: 4, name: 'Morty Smith', status: 'Dead', gender: 'Male' }
        ]
      })
    })
  );

  global.fetch = mockFetch;

  const characterAPI = new CharacterAPI('http://mockapi.com');
  const aliveCharacters = await characterAPI.getAliveCharacters();

  expect(aliveCharacters.results).toEqual([
    { id: 1, name: 'Rick_Sanchez', status: 'Alive', gender: 'Male' },
    { id: 2, name: 'Morty_Smith', status: 'Alive', gender: 'Male' },
    { id: 3, name: 'Rick_Sanchez', status: 'Alive', gender: 'Male' }
  ]);

  expect(mockFetch).toHaveBeenCalledTimes(1);
});
</code></div></div></pre>

### Cómo Replicarlo

1. Clona el repositorio y navega a la carpeta del proyecto.
2. Instala las dependencias utilizando `npm install` o `yarn`.
3. Ejecuta las pruebas con `npm test` o `yarn test` para verificar que todo funciona correctamente.
