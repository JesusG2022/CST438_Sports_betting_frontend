import { apiCall } from '../apiScripts.js';

//Mock The fetch request
// https://jestjs.io/docs/mock-function-api
//https://jestjs.io/docs/asynchronous
// https://www.codementor.io/@chihebnabil/complete-guide-to-mocking-fetch-in-jest-2lejnjl4bs

// This test is simply to test that the fetch function is called properly and that
// the response data  is passed to the setJSonResponse function. I am not capable of doing
// any more complex tests at this time.

// mocking fetch request
global.fetch = jest.fn();

describe('apiCall function', () => {
  it('should call fetch with correct URL and pass the response data to setJsonResponse', async () => {
    
    // Mock the fetch response
    const mockResponse = { response: [{ id: 1, name: 'Test Team' }] };

    // https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvalueoncevalue
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    // mocking the setJsonResponse function
    const mockSetJsonResponse = jest.fn();

    // Call the apiCall function
    await apiCall('https://api-nba-v1.p.rapidapi.com/games?season=2024&team=1', mockSetJsonResponse);

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'https://api-nba-v1.p.rapidapi.com/games?season=2024&team=1',
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'x-rapidapi-key': expect.any(String),
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        }),
      })
    );

    // Check if setJsonResponse was called with the correct data
    expect(mockSetJsonResponse).toHaveBeenCalledWith(mockResponse);
  });
});
