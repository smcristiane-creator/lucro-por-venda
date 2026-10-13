# Lucro por Venda

Site estático responsivo feito com HTML, CSS e JavaScript puro. Não precisa de banco de dados nem de instalação.

## Arquivos
- `index.html`: conteúdo e estrutura da página
- `styles.css`: identidade visual e layout responsivo
- `script.js`: cálculos, exportação CSV e botão de interesse
- `README.md`: instruções

## Testar no computador
1. Extraia o arquivo ZIP.
2. Abra `index.html` no navegador.
3. Edite os valores e teste a calculadora, o preço ideal e o botão de exportar CSV.

## Publicar gratuitamente com GitHub Pages
1. Crie uma conta em https://github.com/ se ainda não tiver.
2. Crie um repositório público, por exemplo `lucro-por-venda`.
3. Envie os quatro arquivos do projeto para a raiz do repositório (não envie a pasta ZIP dentro do repositório).
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**.
6. Escolha a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
7. Aguarde a publicação. O GitHub mostrará o endereço do site na seção Pages, normalmente no formato `https://SEU-USUARIO.github.io/lucro-por-venda/`.

## Alternativa: Netlify
1. Entre em https://app.netlify.com/.
2. Escolha a opção de adicionar um site por implantação manual (drag and drop).
3. Arraste a pasta extraída contendo `index.html`, `styles.css` e `script.js`.
4. Use o endereço gerado pelo Netlify ou conecte um domínio próprio.

## Antes de divulgar
- Abra `script.js` e troque `SEUEMAIL@EXEMPLO.COM` pelo e-mail comercial que receberá interessados no kit.
- Altere o preço sugerido do kit e a oferta conforme seu produto real.
- Adicione política de privacidade, termos de uso e identificação comercial apropriada se passar a coletar dados, usar ferramentas de análise, publicidade ou vender produtos.
- A versão atual não coleta nem envia os valores da calculadora a um servidor. O botão de interesse usa o aplicativo de e-mail do visitante após a configuração.
- A estimativa não é apuração contábil/fiscal. Custos fixos, perdas, devoluções e tributos não informados podem alterar o lucro efetivo.

## Como funciona o preço ideal
Preço de referência = custos por unidade ÷ (1 − margem desejada / 100).
Exemplo: custos de R$ 66 e margem desejada de 30% → preço de R$ 94,29.
A fórmula supõe que os custos informados sejam valores fixos por unidade. Taxas percentuais sobre o preço precisam ser modeladas de forma diferente para manter a margem pretendida.
