FROM node:20-alpine AS builder
WORKDIR /app
# Instalar pnpm globalmente
RUN npm install -g pnpm
# Copiar arquivos de configuração do monorepo
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
# Instalar dependências
RUN pnpm install --frozen-lockfile
# Copiar código-fonte da API
COPY apps/api ./apps/api
# Compilar o TypeScript para JavaScript
WORKDIR /app/apps/api
RUN pnpm build
# Estágio final de produção
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /app/apps/api/dist ./apps/api/dist
WORKDIR /app/apps/api
EXPOSE 3001
CMD ["node", "dist/index.js"]