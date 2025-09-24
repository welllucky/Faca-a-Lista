# Guia de Arquitetura e Desenvolvimento
Este documento serve como um guia completo para a arquitetura de projetos React Native, combinando os princípios da Arquitetura em Camadas, Model-View-ViewModel (MVVM) e Inversão de Dependência. O objetivo é criar uma base de código escalável, testável e de fácil manutenção.

## 1. Princípios Arquiteturais
A nossa arquitetura baseia-se em três pilares principais:

- Arquitetura em Camadas: Separa o código por responsabilidades técnicas (data, domain, presentation), garantindo que a lógica de negócio permaneça isolada e reutilizável.
- MVVM na Camada de Apresentação: Isola o estado e a lógica da UI (no ViewModel) dos componentes visuais (a View), tornando a UI "burra" e fácil de testar.
- Inversão de Dependência: Desacopla a nossa aplicação de detalhes de implementação (bibliotecas, frameworks) através do uso de contratos (interfaces), o que nos dá a liberdade de trocar dependências sem reescrever a lógica de negócio.

## 2. Estrutura de Pastas do Projeto
A estrutura de pastas foi projetada para refletir claramente estes princípios.
```
.
├── src/
│   ├── app/                       # Expo Router - Roteamento file-based (substituiu navigation/)
│   │   ├── (access)/              # Grupo de autenticação
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── recover.tsx
│   │   ├── (tabs)/                # Grupo de tabs (navegação principal)
│   │   │   ├── index.tsx          # Tab Home
│   │   │   ├── lists/
│   │   │   │   ├── _layout.tsx    # Stack layout para listas
│   │   │   │   ├── index.tsx      # Listagem
│   │   │   │   ├── [id].tsx       # Detalhes (dinâmico)
│   │   │   │   └── create.tsx     # Criar nova
│   │   │   └── _layout.tsx        # Tab layout
│   │   ├── _layout.tsx            # Root layout
│   │   └── +not-found.tsx         # 404
│   │
│   ├── core/                      # Abstrações e contratos essenciais
│   │   ├── contracts/             # Interfaces de serviços
│   │   ├── infra/                 # Implementações de infraestrutura
│   │   │   ├── http/              # Cliente HTTP (Axios, Fetch)
│   │   │   ├── storage/           # Storage (SecureStore, SQLite)
│   │   │   └── analytics/         # Analytics (Firebase, etc.)
│   │   └── utils/                 # Utilitários compartilhados
│   │
│   ├── data/                      # Camada de acesso a dados
│   │   ├── dtos/                  # Data Transfer Objects (estruturas da API)
│   │   ├── mappers/               # Conversores DTO ↔ Entidade
│   │   └── repositories/          # Implementação dos repositórios
│   │
│   ├── domain/                    # Lógica de negócio pura (sem dependências externas)
│   │   ├── entities/              # Modelos de negócio
│   │   ├── repositories/          # Interfaces dos repositórios
│   │   └── useCases/              # Casos de uso (regras de negócio)
│   │
│   │
│   ├── presentation/              # Camada de UI
│   │   ├── assets/                # Recursos estáticos
│   │   │   ├── fonts/             # Fontes (Inter, etc.)
│   │   │   └── images/            # Imagens, ícones, splash
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── hooks/                 # Hooks customizados
│   │   ├── screens/               # Telas da aplicação
│   │   │   └── Home/
│   │   │       ├── index.ts       # Re-export
│   │   │       ├── Home.view.tsx       # UI (componente visual)
│   │   │       ├── Home.viewModel.ts   # Lógica e estado
│   │   │       └── Home.styles.ts      # Estilos isolados
│   │   └── themes/                # Sistema de temas
│   │       ├── dark/              # Tema escuro
│   │       ├── light/             # Tema claro
│   │       └── index.ts           # Configuração de temas
│   │
│   └── docs/                      # Documentação técnica
│
├── plugins/                       # Expo config plugins customizados
│   ├── increaseAsyncStorage.ts    # Plugin AsyncStorage
│   └── index.ts
│
├── app.config.ts                  # Configuração do Expo
├── tsconfig.json                  # TypeScript config
└── package.json
```

### Path Aliases Configurados

O projeto usa aliases TypeScript para imports mais limpos:

```typescript
@/*           → src/*
@app/*        → src/app/*
@components/* → src/presentation/components/*
@hooks/*      → src/presentation/hooks/*
@screens/*    → src/presentation/screens/*
@themes/*     → src/presentation/themes/*
@utils/*      → src/core/utils/*
@core/*       → src/core/*
@data/*       → src/data/*
@domain/*     → src/domain/*
@presentation/* → src/presentation/*
```
## 3. Guia de Operações do Projeto
Este manual descreve como realizar as tarefas mais comuns de desenvolvimento.

### 3.1. Como Criar uma Nova Tela (Ex: UserProfile)

**Padrão de Nomenclatura:** `NomeTela.view.tsx`, `NomeTela.viewModel.ts`, `NomeTela.styles.ts`

1. **Estrutura da Tela:**
    * Crie a pasta `src/presentation/screens/UserProfile/`
    * Dentro dela, crie os arquivos:
      - `UserProfile.view.tsx` (UI)
      - `UserProfile.viewModel.ts` (lógica e estado)
      - `UserProfile.styles.ts` (estilos)
      - `index.ts` (re-export)

2. **Definir a Lógica de Negócio (Camada domain):**
    * Identifique a necessidade: "Preciso buscar os dados de um perfil de usuário"
    * Defina o contrato em `src/domain/repositories/IUserRepository.ts`:
      ```typescript
      getUserProfile(id: string): Promise<UserProfile>;
      ```
    * Crie a entidade `src/domain/entities/UserProfile.ts`
    * Crie o caso de uso `src/domain/useCases/GetUserProfileUseCase.ts`

3. **Implementar o Acesso a Dados (Camada data):**
    * Em `src/data/repositories/UserRepository.ts`, implemente `getUserProfile` usando o httpClient injetado
    * Se necessário, crie `src/data/dtos/UserProfileDTO.ts` e `src/data/mappers/UserProfileMapper.ts`

4. **Desenvolver o ViewModel:**
    * Em `UserProfile.viewModel.ts`:
      - Importe e instancie o `GetUserProfileUseCase`
      - Crie estados: `profile`, `isLoading`, `error`
      - Crie função `fetchProfile` que executa o caso de uso
      - Exponha estados e funções no retorno do hook

5. **Desenvolver a View:**
    * Em `UserProfile.view.tsx`:
      - Importe o hook do ViewModel
      - Renderize UI com base nos estados
      - View apenas exibe dados e chama funções do ViewModel

6. **Adicionar Rota no Expo Router:**
    * Crie arquivo em `src/app/` seguindo a convenção:
      - Tela simples: `src/app/profile.tsx`
      - Tela em grupo: `src/app/(tabs)/profile.tsx`
      - Tela dinâmica: `src/app/profile/[id].tsx`
    * No arquivo de rota, importe e use a View:
      ```typescript
      import UserProfile from '@screens/UserProfile';
      export default UserProfile;
      ```

### 3.2. Como Criar um Novo Componente Compartilhado (Ex: Avatar)

1. **Criação do Arquivo:**
    * Crie o arquivo `src/presentation/components/Avatar.tsx`
    * Use import com alias: `import { Avatar } from '@components/Avatar'`

2. **Princípios do Componente:**
    * **"Burro" (Presentational):** Não deve buscar dados nem conter lógica de negócio
    * **Baseado em props:** Recebe todos os dados e funções via props (ex: `imageUrl`, `size`, `onPress`)
    * **Consistente:** Use o tema global de `@themes`

3. **Exemplo de Estrutura:**
    ```typescript
    // src/presentation/components/Avatar.tsx
    import { Image, Pressable } from 'react-native';
    import { useTheme } from '@themes';

    interface AvatarProps {
      imageUrl: string;
      size?: number;
      onPress?: () => void;
    }

    export function Avatar({ imageUrl, size = 40, onPress }: AvatarProps) {
      const theme = useTheme();

      return (
        <Pressable onPress={onPress}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
          />
        </Pressable>
      );
    }
    ```

### 3.3. Como Adicionar uma Nova Dependência (Ex: expo-location)

**IMPORTANTE:** Nunca use a biblioteca diretamente no seu código de negócio ou de UI!

1. **Instalação:**
    ```bash
    bun add expo-location
    # ou para dependências nativas:
    bun ad expo-location  # usa 'expo install' automaticamente
    ```

2. **Criar o Contrato (Camada core/contracts):**
    * Crie `src/core/contracts/location/LocationClient.ts`
    * Defina interface com os métodos que sua aplicação precisa:
    ```typescript
    export interface LocationClient {
      getCurrentPosition(): Promise<{ lat: number; lon: number }>;
      watchPosition(callback: (coords: Coordinates) => void): () => void;
    }
    ```

3. **Criar o Adaptador (Camada core/infra):**
    * Crie `src/core/infra/location/ExpoLocationAdapter.ts`
    * Esta classe implementa `LocationClient`
    * **Este é o ÚNICO arquivo** que importa `expo-location`
    * Ele "traduz" as chamadas da biblioteca para os métodos da interface

    ```typescript
    import * as Location from 'expo-location';
    import type { LocationClient } from '@core/contracts/location/LocationClient';

    export class ExpoLocationAdapter implements LocationClient {
      async getCurrentPosition() {
        const { coords } = await Location.getCurrentPositionAsync();
        return { lat: coords.latitude, lon: coords.longitude };
      }

      watchPosition(callback: (coords: Coordinates) => void) {
        const subscription = Location.watchPositionAsync({}, (location) => {
          callback({
            lat: location.coords.latitude,
            lon: location.coords.longitude
          });
        });

        return () => subscription.then(sub => sub.remove());
      }
    }
    ```

4. **Injetar e Usar:**
    * No UseCase ou Repository, dependa da **interface** `LocationClient`
    * Injete via construtor (Dependency Injection)
    * A implementação concreta vem das constantes em `src/core/implementations.ts/`

    ```typescript
    // src/domain/useCases/GetUserLocationUseCase.ts
    export class GetUserLocationUseCase {
      constructor(private locationClient: LocationClient) {}

      async execute() {
        return await this.locationClient.getCurrentPosition();
      }
    }
    ```

### 3.4. Expo Router - Roteamento File-Based

O projeto usa **Expo Router v6** com roteamento baseado em arquivos, substituindo o React Navigation tradicional.

#### Conceitos Principais:

**1. Convenção de Arquivos:**
- `index.tsx` → rota raiz do diretório
- `profile.tsx` → `/profile`
- `[id].tsx` → rota dinâmica `/users/123`
- `(group)/` → grupo de rotas (não afeta URL)
- `_layout.tsx` → layout compartilhado

**2. Grupos de Rotas:**
```
src/app/
├── (access)/           # Grupo de autenticação
│   ├── login.tsx      # /login
│   └── register.tsx   # /register
└── (tabs)/            # Grupo de tabs
    ├── index.tsx      # / (Home)
    └── lists/
        ├── _layout.tsx    # Stack layout
        ├── index.tsx      # /lists
        ├── [id].tsx       # /lists/:id
        └── create.tsx     # /lists/create
```

**3. Layouts:**
```typescript
// src/app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="lists" options={{ title: "Listas" }} />
    </Tabs>
  );
}
```

**4. Navegação Programática:**
```typescript
import { router } from 'expo-router';

// Navegar
router.push('/profile');
router.push({ pathname: '/lists/[id]', params: { id: '123' } });

// Voltar
router.back();

// Substituir
router.replace('/login');
```

**5. Rotas Tipadas:**
O projeto tem `experiments.typedRoutes: true` ativado, gerando tipos automáticos em `.expo/types/router.d.ts`.

### 3.5. Como Adicionar Testes

**1. Testes Unitários (ViewModel, UseCases, Mappers):**

* **Localização:** Ao lado do arquivo testado (ex: `UserProfile.viewModel.test.ts`)
* **Estratégia:**
    - Crie mocks das dependências
    - Para testar UseCase, crie `HttpClientMock` que implementa `HttpClient`
    - Injete mocks no construtor
    - Use `expect` para verificar mudanças de estado

**2. Testes de Componente (Views e Componentes):**

* **Ferramenta:** `@testing-library/react-native`
* **Localização:** Ao lado do componente (ex: `UserProfile.view.test.tsx`)
* **Estratégia:**
    - Mock do ViewModel com estados fixos (loading, erro, sucesso)
    - Use queries: `findByText`, `getByTestId`
    - Simule eventos: `fireEvent.press`
    - Verifique chamadas de funções mockadas

**Exemplo de Teste:**
```typescript
// UserProfile.viewModel.test.ts
import { renderHook } from '@testing-library/react-hooks';
import { useUserProfileViewModel } from './UserProfile.viewModel';

describe('UserProfileViewModel', () => {
  it('should load user profile', async () => {
    const { result } = renderHook(() => useUserProfileViewModel());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.profile).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
```

## 4. Stack Tecnológico

### Core
- **Expo SDK:** 54.0.9
- **React Native:** 0.81.4
- **React:** 19.1.0
- **TypeScript:** 5.9.2
- **Bun:** 1.2.22 (package manager)

### Roteamento e Navegação
- **Expo Router:** 6.0.10 (file-based routing)
- Rotas tipadas habilitadas

### Armazenamento
- **expo-secure-store:** Dados sensíveis (tokens, credenciais)
- **expo-sqlite:** Banco de dados local estruturado

### Backend Services
- **Firebase:** Analytics, Auth, Crashlytics, Messaging, Remote Config
- **Sentry:** Error tracking e monitoring

### Qualidade de Código
- **ESLint:** Linting
- **Prettier:** Formatação automática
- **Husky + lint-staged:** Pre-commit hooks

### Importantes
- **New Architecture:** Habilitada (`newArchEnabled: true`)
- **Kotlin:** 2.1.20 (Android)
- **Node mínimo:** 20.19.4

## 5. Conclusão

Adotar esta estrutura e fluxos de trabalho exige disciplina inicial, mas os benefícios a longo prazo são imensos:

✅ **Código Limpo:** Separação clara de responsabilidades
✅ **Fácil Manutenção:** Mudanças isoladas e previsíveis
✅ **Testável:** Mocks simples via interfaces
✅ **Flexível:** Troca de tecnologias sem reescrever lógica de negócio
✅ **Escalável:** Estrutura suporta crescimento do projeto

O ativo mais valioso do projeto está protegido: **a lógica de negócio no domínio**.