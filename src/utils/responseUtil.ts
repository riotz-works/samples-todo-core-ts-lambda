import { ApiCore, ResponseEntity } from '../apiCore';

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
    public static errorResponse(statusCode: number, message: string): ResponseEntity {
        return new ApiCore.api.ApiResponse(JSON.stringify({ 'errorMessage': message }), {}, statusCode);
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
            statusCode: number, body: T, headers: { [name: string]: string } = {}): ResponseEntity {
        return new ApiCore.api.ApiResponse(JSON.stringify(body), headers, statusCode);
    }

}
