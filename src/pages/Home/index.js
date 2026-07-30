import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import PlaceCard from '../../components/PlaceCard';
import placesData from '../../data/places';

export default function Home({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Categorias disponíveis para filtro rápido
  const categories = [
    'Todos',
    'Ponto turístico',
    'Parque',
    'Cultura',
    'Religioso',
    'Histórico',
    'Favoritos ⭐'
  ];

  // Simulação de carregamento de API com setTimeout
  function loadPlaces() {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setPlaces(placesData);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
      setPlaces([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPlaces();
  }, []);

  // Alternar estado de favorito (Desafio Opcional)
  function toggleFavorite(placeId) {
    setFavoriteIds((currentIds) => {
      const isFavorite = currentIds.includes(placeId);
      if (isFavorite) {
        return currentIds.filter((id) => id !== placeId);
      }
      return [...currentIds, placeId];
    });
  }

  // Filtragem otimizada com useMemo por Nome, Categoria, Bairro e Filtros Rápidos
  const filteredPlaces = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return places.filter((place) => {
      // Filtro por Categoria Selecionada
      if (selectedCategory === 'Favoritos ⭐') {
        if (!favoriteIds.includes(place.id)) return false;
      } else if (
        selectedCategory !== 'Todos' &&
        !place.category.toLowerCase().includes(selectedCategory.toLowerCase())
      ) {
        return false;
      }

      // Filtro pelo texto da caixa de pesquisa
      if (normalizedSearch === '') return true;

      const name = place.name.toLowerCase();
      const category = place.category.toLowerCase();
      const neighborhood = place.neighborhood.toLowerCase();

      return (
        name.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        neighborhood.includes(normalizedSearch)
      );
    });
  }, [places, searchText, selectedCategory, favoriteIds]);

  function openDetails(place) {
    navigation.navigate('Details', {
      place: place
    });
  }

  function renderPlace({ item }) {
    return (
      <PlaceCard
        place={item}
        onPress={() => openDetails(item)}
        isFavorite={favoriteIds.includes(item.id)}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>
          Nenhum local encontrado
        </Text>
        <Text style={styles.emptyMessage}>
          {selectedCategory === 'Favoritos ⭐'
            ? 'Você ainda não marcou nenhum local como favorito.'
            : 'Não encontramos locais para a busca digitada. Tente pesquisar outro nome, categoria ou bairro.'}
        </Text>

        {(searchText !== '' || selectedCategory !== 'Todos') && (
          <Pressable
            style={styles.resetFilterButton}
            onPress={() => {
              setSearchText('');
              setSelectedCategory('Todos');
            }}
          >
            <Text style={styles.resetFilterText}>Limpar pesquisa e filtros</Text>
          </Pressable>
        )}
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#17533e" />
        <Text style={styles.loadingTitle}>Descobrindo Garanhuns...</Text>
        <Text style={styles.loadingSubtitle}>Carregando os pontos turísticos da cidade</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho com FlatList como elemento principal */}
      <FlatList
        data={filteredPlaces}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            {/* Boas-Vindas */}
            <View style={styles.introduction}>
              <Text style={styles.badgeLabel}>🌿 Suíça Pernambucana</Text>
              <Text style={styles.title}>Descubra Garanhuns</Text>
              <Text style={styles.subtitle}>
                Explore os pontos turísticos, culturais e naturais mais marcantes da cidade das flores.
              </Text>
            </View>

            {/* Campo de Pesquisa */}
            <View style={styles.inputWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.input}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Pesquisar por nome, categoria ou bairro..."
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
              />
              {searchText.length > 0 && (
                <Pressable
                  onPress={() => setSearchText('')}
                  style={styles.clearButton}
                  hitSlop={8}
                >
                  <Text style={styles.clearButtonText}>✕</Text>
                </Pressable>
              )}
            </View>

            {/* Filtros em Carrossel de Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryScroll}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <Pressable
                    key={cat}
                    style={[
                      styles.categoryChip,
                      isActive && styles.categoryChipActive
                    ]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        isActive && styles.categoryChipTextActive
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Contador de Resultados */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultText}>
                {filteredPlaces.length}{' '}
                {filteredPlaces.length === 1
                  ? 'local encontrado'
                  : 'locais encontrados'}
              </Text>
              {favoriteIds.length > 0 && (
                <Text style={styles.favoriteCounter}>
                  ★ {favoriteIds.length} salvos
                </Text>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={
          filteredPlaces.length === 0
            ? styles.emptyListContainer
            : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32
  },

  emptyListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1
  },

  headerComponent: {
    paddingTop: 16,
    paddingBottom: 12
  },

  introduction: {
    marginBottom: 16
  },

  badgeLabel: {
    color: '#17533e',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6
  },

  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 10
  },

  input: {
    flex: 1,
    color: '#0f172a',
    fontSize: 15,
    paddingVertical: 14
  },

  clearButton: {
    padding: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  clearButtonText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: 'bold'
  },

  categoryScroll: {
    paddingRight: 16,
    gap: 8,
    marginBottom: 14
  },

  categoryChip: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8
  },

  categoryChipActive: {
    backgroundColor: '#17533e',
    borderColor: '#17533e'
  },

  categoryChipText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600'
  },

  categoryChipTextActive: {
    color: '#ffffff',
    fontWeight: '700'
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12
  },

  resultText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600'
  },

  favoriteCounter: {
    color: '#d97706',
    fontSize: 13,
    fontWeight: '700'
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 24
  },

  loadingTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 4
  },

  loadingSubtitle: {
    color: '#64748b',
    fontSize: 14
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    marginTop: 12
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 12
  },

  emptyTitle: {
    color: '#0f172a',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center'
  },

  emptyMessage: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 16
  },

  resetFilterButton: {
    backgroundColor: '#17533e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10
  },

  resetFilterText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700'
  }
});
