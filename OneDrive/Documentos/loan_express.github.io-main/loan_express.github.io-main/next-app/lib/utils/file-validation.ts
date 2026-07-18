// File validation utilities for secure file uploads

// Magic numbers (file signatures) for common file types
const FILE_SIGNATURES = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  'application/pdf': [0x25, 0x50, 0x44, 0x46] // %PDF
} as const;

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export type AllowedMimeType = typeof ALLOWED_MIME_TYPES[number];

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates file type using magic numbers (file signatures)
 * This prevents attackers from renaming malicious files
 */
export async function validateFileType(buffer: Buffer, expectedMimeType: string): Promise<FileValidationResult> {
  const signature = FILE_SIGNATURES[expectedMimeType as keyof typeof FILE_SIGNATURES];
  
  if (!signature) {
    return { valid: false, error: 'Unsupported file type' };
  }

  // Check if the file starts with the expected magic numbers
  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) {
      return { valid: false, error: 'File signature does not match declared type' };
    }
  }

  return { valid: true };
}

/**
 * Validates MIME type against whitelist
 */
export function isValidMimeType(mimeType: string): mimeType is AllowedMimeType {
  return ALLOWED_MIME_TYPES.includes(mimeType as AllowedMimeType);
}

/**
 * Validates file size
 */
export function validateFileSize(size: number): FileValidationResult {
  if (size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB` };
  }
  return { valid: true };
}

/**
 * Comprehensive file validation
 */
export async function validateFile(
  buffer: Buffer,
  mimeType: string,
  size: number
): Promise<FileValidationResult> {
  // Validate MIME type
  if (!isValidMimeType(mimeType)) {
    return { valid: false, error: `Invalid MIME type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}` };
  }

  // Validate file size
  const sizeValidation = validateFileSize(size);
  if (!sizeValidation.valid) {
    return sizeValidation;
  }

  // Validate file signature
  const signatureValidation = await validateFileType(buffer, mimeType);
  if (!signatureValidation.valid) {
    return signatureValidation;
  }

  return { valid: true };
}

/**
 * Generates a secure filename using UUID
 * This prevents directory traversal and filename collisions
 */
export function generateSecureFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop() || '';
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Sanitizes filename by removing dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.') // Prevent directory traversal
    .replace(/^\.+/, ''); // Remove leading dots
}
