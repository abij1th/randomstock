const axios = require('axios');

const QUOTE_INFO_URL = 'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=';
const GET_QUOTE_URL = 'https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=';

const getQuoteInfo = (symbol) => {
	return axios.get(QUOTE_INFO_URL + encodeURIComponent(symbol), {
		headers: {
			Referer: GET_QUOTE_URL + encodeURIComponent(symbol),
			'X-Requested-With': 'XMLHttpRequest'
		}
	})
}
export default async function handler(req, res) {
  const stockData = await getQuoteInfo('SBIN');
  const {symbol, pChange, lastPrice } = stockData.data.data[0];
  res.status(200).json({
	  symbol: symbol,
	  pChange: pChange,
	  lastPrice: lastPrice
  });
}
