import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import format from "date-fns/format";

function relatorioVendasPDF(
  dataInicio,
  dataFim,
  pedidos,
  anunciosMaisVendidos,
  receitaLiquida,
  totalItens
) {
  const titulo = [
    {
      text: `Relatório de vendas para o período de ${dataBr(
        dataInicio,
        true
      )} até ${dataBr(dataFim, true)}`,
      fontSize: 15,
      bold: true,
      margin: [80, 20, 0, 10],
    },
  ];
  const dados1 = pedidos.map((p) => {
    return [
      { text: p._id, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: p.carrinho.map(
          (a) =>
            `${a.anuncio._id}/Qtd: ${a.qtd}/${parseFloat(
              a.anuncio.preco_venda - a.anuncio.promocao_anuncio
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}\n`
        ),

        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: parseFloat(p.totalCarrinho).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: `${p.freteEmpresa}/${p.freteServico}/${parseFloat(
          p.fretePreco
        ).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: parseFloat(p.entradaPgtoLiq - p.fretePreco).toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      {
        text: dataBr(p.createdAt, false),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });
  let dados2 = anunciosMaisVendidos.map((a) => {
    return [
        { text: a[0], fontSize: 9, margin: [0, 2, 0, 2] },
        { text: a[1], fontSize: 9, margin: [0, 2, 0, 2]},
        { text: (`${((a[1]/totalItens)*100).toFixed(1)}%`), fontSize: 9, margin: [0, 2, 0, 2]},
    ]
  });
  const conteudo = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", 40, 70, 40, 50],
        body: [
          [
            { text: "Pedido", style: "tableHeader", fontSize: 10 },
            { text: "Anúncios", style: "tableHeader", fontSize: 10 },
            { text: "Valor Total", style: "tableHeader", fontSize: 10 },
            { text: "Frete", style: "tableHeader", fontSize: 10 },
            { text: "Receita Líquida", style: "tableHeader", fontSize: 10 },
            { text: "Data", style: "tableHeader", fontSize: 10 },
          ],
          ...dados1,
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 25, 0, 0],
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*"],
        body: [
          [
            { text: "Anúncios", style: "tableHeader", fontSize: 10 },
            { text: "Qtd", style: "tableHeader", fontSize: 10 },
            { text: "%", style: "tableHeader", fontSize: 10 },
          ],
          ...dados2,
        [{ text: "Total de itens vendidos no período", fontSize: 9, margin: [0, 2, 0, 2] },
        { text: totalItens, fontSize: 9, margin: [0, 2, 0, 2]},
        { text: "100%", fontSize: 9, margin: [0, 2, 0, 2]}]
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 25, 0, 0],
    },
    {
        text: `Total de receita líquida: ${parseFloat(receitaLiquida).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
        fontSize: 12,
        bold: false,
        margin: [330, 20, 0, 10],
      },
    {
      text: "Assinatura: _______________________",
      fontSize: 14,
      bold: true,
      margin: [0, 30, 0, 8],
    },
  ];

  function rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  function dataBr(data, test) {
    let newData = Date.parse(data);
    if (test) newData += 1 * 24 * 60 * 60 * 1000;
    return format(newData, "dd/MM/yyyy");
  }

  const docDefinition = {
    pageSize: "A4",
    pageMargin: [20, 50, 20, 40],

    header: [titulo],
    content: [conteudo],
    footer: rodape,
  };

  pdfMake.createPdf(docDefinition, null, null, pdfFonts.pdfMake.vfs).open();
}

export default relatorioVendasPDF;
