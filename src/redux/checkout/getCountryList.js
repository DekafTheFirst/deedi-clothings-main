const fetchCountryList = async () => {
    try {
        const countryData = await GetCountries();
        return countryData;
        console.log('fetchingCountryList again')

    } catch (error) {
        console.error('Error fetching country data:', error);
    }


};

export default fetchCountryList;