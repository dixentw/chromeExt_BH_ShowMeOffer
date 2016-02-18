if(DBG)console.log("### running main.js --> start");

var companies = [];
var prepareData = (function(){
	if(DBG)console.log("+prepareData");
	var i;
	for(i=0; i< dataOfCompanies.length; i++) {
		var companyData = dataOfCompanies[i].split("@");
		var company = {
			name: companyData[0],
			webSite: companyData[2],
			salaryLink: companyData[3]
		};

		//if(DBG)console.log("push:",company);
		companies.push(company);
	}
	if(DBG)console.log("-prepareData: " + companies.length);
})();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {

	if(DBG)console.log("chrome.tabs.onUpdated:  " + changeInfo.status);

    if (changeInfo.status === 'complete') {

		chrome.tabs.get(tabId,function(tab){
			if(isHitSupportedWebSite(tab.url) === true) {
				var injectedScript = chrome.extension.getURL('data/offerButton.js');
				//chrome.tabs.executeScript(tabId, {file: injectedScript});
			}
		});


    }
});

//Company Info.
//source: "",
//name: "",
//website: ""

var supportedDomain = [
	"www.104.com.tw/",
	"www.ejob.gov.tw/",
	"www.ejob.gov.tw/",
	"www.104temp.com.tw/",
	"www.1111.com.tw/",
	"www.yes123.com.tw/",
	"www.518.com.tw/",
	"www.518.com.tw/",
	"www.linkedin.com/",
	"www.linkedin.com/",
	"www.glassdoor.com/",
	"www.glassdoor.com/"
];

function isHitSupportedWebSite(url) {
	var hit = false;
	for(var i=0; i< supportedDomain.length; i++) {
			if(url.indexOf(supportedDomain[i]) != -1) {
				hit = true;
				break;
			}
	}

	return hit;
}


if(chrome && chrome.runtime) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(DBG)console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
		if (request.companyInfo != undefined) {
			var companyInfo = request.companyInfo;
			if(DBG)console.log("get Companyinfo: ", companyInfo);
			var j;
			for(j=0; j< companies.length; j++) {
				if(DBG)console.log("comparedData: " + companies[j].name, companies[j].webSite);
				if(DBG)console.log("target: " + companyInfo.name, companyInfo.webSite);
				if((companyInfo.name.indexOf(companies[j].name) != -1) ||
					(companyInfo.webSite.indexOf(companies[j].webSite) != -1)
					) {
					if(DBG)console.log("## Hit");
					sendResponse({action: actionList.showOfferInfoButton, companyInfo: companies[j]});
					return;
				}
			}
			if(DBG)console.log("no data is found!");

		}
	});
}


if(DBG)console.log("### running main.js --> done");
