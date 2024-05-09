import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import format from "date-fns/format";

function fluxoFinancasPDF(
  movimento,
  saldo,
  dataInicio,
  dataFim,
  entradaFin,
  saidaFin,
  saldoPeriodoFin
) {
  const titulo = [
    {
      text: `Fluxo financeiro no período de ${dataBr(dataInicio, true)} até ${dataBr(
        dataFim, true
      )}`,
      fontSize: 15,
      bold: true,
      margin: [80, 20, 0, 10],
    },
  ];
  const dados = movimento.map((c) => {
    return [
      { text: c.descricao_movimento, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: parseFloat(c.valor_movimento).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      { text: dataBr(c.data_movimento, false), fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });
  const conteudo = [
    {
      text: `Saldo Total: ${parseFloat(saldo).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
      fontSize: 12,
      bold: false,
      margin: [340, 20, 0, 10],
    },
    {
      table: {
        headerRows: 1,
        widths: [310, "*", "*", "*"],
        body: [
          [
            { text: "Descrição", style: "tableHeader", fontSize: 10 },
            { text: "Valor", style: "tableHeader", fontSize: 10 },
            { text: "Data", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10, 0, 0],
    },
    {
      columns: [
        {
          width: "auto",
          text: `Entrada: ${parseFloat(entradaFin).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`,
          margin: [0, 10, 85, 0]
        },
        {
          width: "auto",
          text: `Saida: ${parseFloat(saidaFin).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`,
          margin: [0, 10, 85, 0]
        },
        {
          width: "auto",
          text: `Balanço: ${parseFloat(saldoPeriodoFin).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`,
          margin: [0, 10, 0, 0]
          
        },
      ],
    },
    {
      text: "Assinatura: _______________________",
      fontSize: 14,
      bold: true,
      margin: [0, 40, 0, 8],
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
    if(test) newData += 1 * 24 * 60 * 60 * 1000
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

export default fluxoFinancasPDF;
