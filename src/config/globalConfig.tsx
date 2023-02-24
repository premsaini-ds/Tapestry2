export const limit = 5; 
export const radius = 500;
export const defaultQuery = "";
export const baseApiUrl = "https://liveapi-sandbox.yext.com/v2/accounts/me";
export const liveAPIKey = "87476fe6f6e0b32b52ec673472ec246e";
export const googleMapsApiKey = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
// export const savedFilterId = "54589289";
export const entityTypes = "location";
export const BaseUrl = "https://n7xmdxd5uc-134480-d.sbx.preview.pagescdn.com/";
//export const BaseUrl = "https://staging-fondly--nutty--goose-pgsdemo-com.preview.pagescdn.com";
export const googleMapsConfig =  {
    centerLatitude: 51.507351,
    centerLongitude:-0.127758,
    googleMapsApiKey: "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"  
};  
export const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
export const WellSocialMediaUrls = {
    facebook: "https://www.facebook.com/PharmacyWell/",
    twitter: "https://twitter.com/wellpharmacy",
    instagram: "https://www.instagram.com/wellpharmacy/",
    linkedin: "https://www.linkedin.com/company/wellpharmacy/",
    tiktok : "#",   
  };
  export const breadcrumbhome = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.002" viewBox="0 0 20 20.002">
  <path d="M877,4760h5a1,1,0,0,0,1-1v-8.59l.293.3a1,1,0,1,0,1.414-1.42l-9-9a1,1,0,0,0-1.414,0l-9,9a1,1,0,0,0,1.414,1.42l.293-.3V4759a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1v-5h2v5A1,1,0,0,0,877,4760Zm4-2h-3v-5a1,1,0,0,0-1-1h-4a1,1,0,0,0-1,1v5h-3v-9.59l6-6,6,6Z" transform="translate(-865 -4739.998)" fill="#02a6db" fill-rule="evenodd"/>
  </svg>`;
export function slugify(slugString:any){
    slugString.toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/, "");
    slugString = slugString.replaceAll("  ", "-");
    slugString = slugString.replaceAll(" ", "-");
    slugString = slugString.replaceAll("---","-");
    slugString = slugString.replaceAll("--","-");
    slugString = slugString.replaceAll("'","");
    return slugString.toLowerCase();
};
export function slugify1(slugString:any){
    slugString.charAt(0,9).toUpperCase() + slugString.slice(1). toLowerCase().toString();
    slugString = slugString.replace(/[&\/\\#^+()$~%.'":*?<>{}!@_]/, " ");
    slugString = slugString.replaceAll("_", " ");
    return slugString.charAt(0,9).toUpperCase()+ slugString.slice(1). toLowerCase().toString();
};
export const defaultTimeZone = "Europe/London";
export const AnalyticsEnableDebugging  = true;
export const AnalyticsEnableTrackingCookie  = true;
export const conversionDetailsDirection = {
    cid: "",
    cv: "1",
  };
export const AnswerExperienceConfig =  {
    experienceKey: "tapestry",
    locale:"en",
    apiKey: "2d7c79f7c0257eb1d29f626786f4a2c1",
    verticalKey: "locations",
    experienceVersion: "STAGING",
    sessionTrackingEnabled: true,
    endpoints:{
        universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
        verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
        questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
        universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
        verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
        filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch"
    }
};


