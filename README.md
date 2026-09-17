# Playwright Iniciante

Projeto de estudos de automação de testes web utilizando o [Playwright](https://playwright.dev/), com foco em fundamentos de testes E2E, organização de código com Page Objects, reaproveitamento de sessão (contexto) e integração contínua com GitHub Actions.

## 🧰 Tecnologias

- [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- JavaScript
- Node.js
- GitHub Actions (CI)

## 📁 Estrutura do projeto

```
playwright_iniciante/
├── .github/
│   └── workflows/
│       └── playwright.yml       # Pipeline de CI (GitHub Actions)
├── screenshots/                 # Screenshots gerados pelos testes
├── tests/
│   ├── example.spec.js          # Cenários de exemplo (scroll, screenshots, tags)
│   ├── LoginTest.spec.js        # Cenários de login (sucesso, e-mail vazio, senha vazia)
│   ├── teste-login.spec.js      # Teste usando contexto/sessão salva
│   ├── auth.setup.js            # Setup de autenticação (salva o storageState)
│   └── login/
│       ├── loginPage.js         # Page Object: elementos e ações da página de login
│       └── loginP2.spec.js      # Testes de login usando o Page Object
├── playwright.config.js         # Configuração do Playwright (browsers, baseURL, projetos)
├── package.json
└── package-lock.json
```

## 🧪 O que os testes cobrem

- **Login (fluxo completo)**: login com sucesso, login com e-mail vazio e login com senha vazia, validando as respectivas mensagens de erro/sucesso.
- **Page Objects**: os fluxos de login foram separados em `loginPage.js` (elementos e ações reutilizáveis) e `loginP2.spec.js` (apenas a execução dos testes), deixando o código mais organizado, reutilizável e fácil de manter.
- **Scroll e Screenshots**: exemplos de como rolar a tela até um elemento (`scrollIntoViewIfNeeded`) e capturar screenshots da página inteira ou de um elemento específico.
- **Contexto/Sessão (storageState)**: `auth.setup.js` realiza o login uma única vez e salva a sessão em `playwright/.auth/user.json`, que é reaproveitada pelo projeto `chromium:saved-credentials` configurado no `playwright.config.js`.
- **Multi-browser**: os testes rodam em Chromium, Firefox, WebKit e emulação mobile (Pixel 5), conforme definido em `playwright.config.js`.

## ⚙️ Pipeline (CI com GitHub Actions)

O projeto tem uma pipeline configurada em `.github/workflows/playwright.yml`, responsável por rodar os testes automaticamente a cada alteração no código. Veja o que cada parte faz:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v5
    - uses: actions/setup-node@v5
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

**Explicando cada trecho:**

- **`on`** – Define os gatilhos da pipeline: ela roda automaticamente em todo **push** ou **pull request** direcionado às branches `main` ou `master`. Isso garante que o código só é testado quando vai (ou pode ir) para a branch principal.
- **`jobs > test`** – Define o job responsável por rodar os testes.
  - **`timeout-minutes: 60`** – Tempo máximo de execução; se passar de 60 minutos, a pipeline é interrompida.
  - **`runs-on: ubuntu-latest`** – Sistema operacional da máquina virtual onde os testes são executados.
- **`steps`** – Sequência de passos executados pela pipeline, em ordem:
  1. **`actions/checkout@v5`** – Baixa o código do repositório na máquina virtual.
  2. **`actions/setup-node@v5`** – Configura o Node.js (versão LTS mais recente) no ambiente.
  3. **Install dependencies** (`npm ci`) – Instala as dependências do projeto de forma limpa e reprodutível, usando o `package-lock.json`.
  4. **Install Playwright Browsers** (`npx playwright install --with-deps`) – Instala os navegadores (Chromium, Firefox, WebKit) e suas dependências de sistema.
  5. **Run Playwright tests** (`npx playwright test`) – Executa toda a suíte de testes.
  6. **Upload artifact** (`actions/upload-artifact@v4`) – Faz o upload do relatório HTML gerado (`playwright-report/`) como artefato do GitHub Actions, mantido por 30 dias. A condição `if: ${{ !cancelled() }}` garante que o relatório seja enviado mesmo se algum teste falhar (só não é enviado se a execução for cancelada).

Depois que a pipeline roda, o relatório fica disponível na aba **Actions** do repositório, na seção de artefatos da execução — basta baixar, descompactar e abrir o arquivo HTML para visualizar os resultados.

## ▶️ Como rodar o projeto

1. Clone o repositório:
```bash
   git clone https://github.com/Nellefb/playwright_iniciante.git
   cd playwright_iniciante
```

2. Instale as dependências:
```bash
   npm ci
```

3. Instale os browsers do Playwright:
```bash
   npx playwright install --with-deps
```

4. Rode os testes:
```bash
   npx playwright test
```

5. Rode em modo interativo (UI):
```bash
   npx playwright test --ui
```

6. Veja o relatório dos testes:
```bash
   npx playwright show-report
```

### Rodando cenários específicos por tag

Alguns testes usam tags (ex: `@login`) para facilitar a execução de suítes específicas:

```bash
npx playwright test --grep "@login"
```

### Rodando com sessão/contexto salvo

O teste `teste-login.spec.js` reutiliza uma sessão já autenticada (via `auth.setup.js`), evitando logar novamente a cada execução:

```bash
npx playwright test --headed teste-login.spec.js --project=chromium:saved-credentials
```

## 🌱 Fluxo de trabalho (branches e Pull Request)

O desenvolvimento segue o fluxo de branches para não subir alterações direto na `master`:

1. Criar uma branch a partir da `master`:
```bash
   git checkout -b feature/nome-da-feature
```
2. Fazer as alterações, `git add` e `git commit`.
3. Subir a branch:
```bash
   git push
```
4. Abrir um **Pull Request** para revisão do time.
5. Após a aprovação e o merge, a pipeline do GitHub Actions roda automaticamente (pois o merge afeta a `master`).
6. Atualizar o repositório local:
```bash
   git checkout master
   git pull
```

## 📌 Observações

- O projeto foi criado como parte de um estudo introdutório de automação web com Playwright, cobrindo desde a configuração inicial até a organização com Page Objects e a criação de uma pipeline de CI.
