import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';

interface Pet {
  id: string;
  apelido: string;
  imageUrl?: string;
  descricao?: string;
  localizacao?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  filteredPets: Pet[] = []; // Lista filtrada para exibição
  isLoading = false; // Indica se a busca está sendo realizada
  searchStarted: boolean = false; 

  constructor(
    private nav: NavController,
    private api: ApiServiceService
  ) {}

  // Navegar para a tab1
  toTab1() {
    this.nav.navigateBack('/tabs/tab1');
  }

  // Realiza a busca na API ao digitar
  async onSearch(event: any) {
    this.searchStarted = true;
    const query = event.target.value?.trim(); // Obtém o valor do input e remove espaços extras

    // Se o input estiver vazio, limpa os resultados e retorna
    if (!query) {
      this.filteredPets = [];
      return;
    }

    this.isLoading = true; // Ativa o estado de carregamento

    try {
      // Faz a requisição para a API com base no valor do input
      const pets = await this.api.get<Pet[]>(`/pet/find/search?query=${query}`, true);
      this.filteredPets = pets || []; // Atualiza os resultados
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      this.filteredPets = []; // Garante que a lista seja esvaziada em caso de erro
    } finally {
      this.isLoading = false; // Desativa o estado de carregamento
    }
  }

  goToDetails(petId: string) {
    this.nav.navigateForward(['pet-details'], { state: { petId } });
  }
}
