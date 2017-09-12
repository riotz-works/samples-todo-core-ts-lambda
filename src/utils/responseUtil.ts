import * as ApiBuilder from 'claudia-api-builder';

/**
 * Utiltiy to generate response in various way.
 */
export class ResponseUtil {

    /**
     * Generates error response entity with given parameters.
     *
     * @param statusCode HTTP status code
     * @param message Error message
     * @return Custom response entity for error
     */
    public static errorResponse(statusCode: number, message: string): ApiBuilder.ResponseEntity {
        console.log(`errorResponse statusCode: ${statusCode} message: ${message}`);

        return new ApiBuilder().ApiResponse({ 'errorMessage': message }, {}, statusCode);
    }

    /**
     * Generate custom response entity with given parameters.
     *
     * @param statusCode HTTP status code
     * @param body Object for response body
     * @param headers Key-value map for HTTP headers
     * @return Custom response entity for error
     */
    public static customResponse<T>(
            statusCode: number, body: T | string, headers: { [name: string]: string } = {}): ApiBuilder.ResponseEntity {
        return new ApiBuilder().ApiResponse(body, headers, statusCode);
    }

}
