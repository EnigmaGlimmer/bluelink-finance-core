import Logger from "./Logger";

// Custom error types for better error handling
export class BlockchainError extends Error {
    code: string;
    originalError: any;
    constructor(message, code, originalError = null) {
        super(message);
        this.name = 'BlockchainError';
        this.code = code;
        this.originalError = originalError;
    }
}

// Error codes for different types of errors
export const ErrorCodes = {
    USER_REJECTED: 'USER_REJECTED',
    INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
    INSUFFICIENT_ALLOWANCE: 'INSUFFICIENT_ALLOWANCE',
    NOT_APPROVED: 'NOT_APPROVED',
    SALE_NOT_ACTIVE: 'SALE_NOT_ACTIVE',
    TOO_HIGH_AMOUNT: 'TOO_HIGH_AMOUNT',
    TOO_LOW_AMOUNT: 'TOO_LOW_AMOUNT',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    INVALID_ADDRESS: 'INVALID_ADDRESS',
    NETWORK_ERROR: 'NETWORK_ERROR',
    CONTRACT_ERROR: 'CONTRACT_ERROR',
    NOT_ENOUGH_SHE: 'NOT_ENOUGH_SHE',
    GAS_ERROR: 'GAS_ERROR',
    SLIPPAGE_ERROR: 'SLIPPAGE_ERROR',
    COOLDOWN_ERROR: 'COOLDOWN_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

// Error message mappings
const ERROR_MESSAGES = {
    [ErrorCodes.USER_REJECTED]: 'Transaction was rejected by user',
    [ErrorCodes.INSUFFICIENT_FUNDS]: 'Insufficient funds for transaction',
    [ErrorCodes.INSUFFICIENT_ALLOWANCE]: 'Insufficient token allowance. Please approve more tokens.',
    [ErrorCodes.NOT_APPROVED]: 'Token is not approved for spending',
    [ErrorCodes.SALE_NOT_ACTIVE]: 'Token sale is not currently active',
    [ErrorCodes.INVALID_AMOUNT]: 'Invalid purchase amount',
    [ErrorCodes.INVALID_ADDRESS]: 'Invalid token address',
    [ErrorCodes.TOO_HIGH_AMOUNT]: 'Purchase amount is too high',
    [ErrorCodes.TOO_LOW_AMOUNT]: 'Purchase amount is too low',
    [ErrorCodes.NETWORK_ERROR]: 'Network error. Please check your connection and try again.',
    [ErrorCodes.CONTRACT_ERROR]: 'Contract error occurred. Please try again.',
    [ErrorCodes.NOT_ENOUGH_SHE]: 'Not enough SHE tokens remaining in the sale',
    [ErrorCodes.GAS_ERROR]: 'Gas estimation failed. Please try again with a higher gas limit.',
    [ErrorCodes.SLIPPAGE_ERROR]: 'Slippage is too high. Please try again.',
    [ErrorCodes.COOLDOWN_ERROR]: 'Please wait one hour after your last purchase before buying again.',
    [ErrorCodes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
};

// Function to parse and categorize errors
const parseError = (error) => {
    const errorMessage = error?.message?.toLowerCase() || '';
    const errorName = error?.name || '';
    const errorCode = error?.code || '';
    const errorReason = error?.reason?.toLowerCase() || '';

    // User rejection errors
    if (errorMessage.includes('user rejected') ||
        errorMessage.includes('user denied') ||
        errorMessage.includes('user cancelled') ||
        errorMessage.includes('user rejected the request') ||
        errorCode === 4001) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.USER_REJECTED], ErrorCodes.USER_REJECTED, error);
    }

    // Insufficient funds errors
    if (errorMessage.includes('insufficient funds') ||
        errorMessage.includes('exceeds balance') ||
        errorMessage.includes('insufficient balance') ||
        errorMessage.includes('InsufficientETH') ||
        errorMessage.includes('balance too low') ||
        errorReason.includes('insufficient funds')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INSUFFICIENT_FUNDS], ErrorCodes.INSUFFICIENT_FUNDS, error);
    }

    if (errorMessage.includes('NotEnoughTokensAvailable'.toLowerCase()) ||
        errorMessage.includes('not enough SHE tokens'.toLowerCase()) ||
        errorMessage.includes('not enough SHE in the sale'.toLowerCase()) ||
        errorReason.includes('not enough SHE'.toLowerCase())) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.NOT_ENOUGH_SHE], ErrorCodes.NOT_ENOUGH_SHE, error);
    }

    // Insufficient allowance errors
    if (errorMessage.includes('insufficient allowance') ||
        errorMessage.includes('allowance too low') ||
        errorMessage.includes('transfer amount exceeds allowance') ||
        errorMessage.includes('erc20: transfer amount exceeds allowance') ||
        errorReason.includes('insufficient allowance')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INSUFFICIENT_ALLOWANCE], ErrorCodes.INSUFFICIENT_ALLOWANCE, error);
    }

    // Sale not active errors
    if (errorMessage.includes('InvalidSalePeriod'.toLowerCase()) ||
        errorMessage.includes('StartTimeInPast'.toLowerCase()) ||
        errorMessage.includes('SaleNotActive'.toLowerCase()) ||
        errorMessage.includes('SaleNotStarted'.toLowerCase()) ||
        errorMessage.includes('SaleEnded'.toLowerCase()) ||
        errorReason.includes('SalePeriodNotSet'.toLowerCase())) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.SALE_NOT_ACTIVE], ErrorCodes.SALE_NOT_ACTIVE, error);
    }

    // Invalid amount errors
    if (errorMessage.includes('invalid amount') ||
        errorMessage.includes('InvalidAmount'.toLowerCase()) ||
        errorReason.includes('invalid amount')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INVALID_AMOUNT], ErrorCodes.INVALID_AMOUNT, error);
    }

    // Invalid address errors
    if (errorMessage.includes('invalid address') ||
        errorMessage.includes('InvalidAddress'.toLowerCase()) ||
        errorReason.includes('invalid address')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INVALID_ADDRESS], ErrorCodes.INVALID_ADDRESS, error);
    }

    // Too high amount errors
    if (errorMessage.includes('amount too high') ||
        errorMessage.includes('PurchaseAmountTooHigh'.toLowerCase())) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.TOO_HIGH_AMOUNT], ErrorCodes.TOO_HIGH_AMOUNT, error);
    }


    // Too low amount errors
    if (errorMessage.includes('amount too low') ||
        errorMessage.includes('PurchaseAmountTooLow'.toLowerCase())) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.TOO_LOW_AMOUNT], ErrorCodes.TOO_LOW_AMOUNT, error);
    }

    // Slippage errors
    if (errorMessage.includes('slippage') ||
        errorMessage.includes('SlippageTooHigh'.toLowerCase()) ||
        errorReason.includes('slippage')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.SLIPPAGE_ERROR], ErrorCodes.SLIPPAGE_ERROR, error);
    }

    // Cooldown errors
    if (errorMessage.includes('CooldownPeriodNotOver'.toLowerCase())) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.COOLDOWN_ERROR], ErrorCodes.COOLDOWN_ERROR, error);
    }

    if (errorMessage.includes('InvalidTokenAddress'.toLowerCase())) {
        return new BlockchainError("Invalid token address", ErrorCodes.INVALID_ADDRESS, error);
    }

    if (errorMessage.includes('InvalidVestingContract'.toLowerCase())) {
        return new BlockchainError("Invalid Vesting Contract", ErrorCodes.INVALID_ADDRESS, error);
    }

    if (errorMessage.includes('InvalidPriceFeed'.toLowerCase())) {
        return new BlockchainError("Invalid Price Feed", ErrorCodes.INVALID_ADDRESS, error);
    }

    if (errorMessage.includes('InvalidRefundAmount'.toLowerCase())) {
        return new BlockchainError("Invalid Refund Amount", ErrorCodes.INVALID_AMOUNT, error);
    }

    if (errorMessage.includes('InvalidTransferAmount'.toLowerCase())) {
        return new BlockchainError("Invalid Transfer Amount", ErrorCodes.INVALID_AMOUNT, error);
    }

    if (errorMessage.includes('InvalidEthPurchase'.toLowerCase())) {
        return new BlockchainError("Invalid ETH Purchase", ErrorCodes.INVALID_AMOUNT, error);
    }

    if (errorMessage.includes('InvalidETHPrice'.toLowerCase())) {
        return new BlockchainError("Invalid ETH Price", ErrorCodes.INVALID_AMOUNT, error);
    }

    // Gas errors
    if (errorMessage.includes('gas') ||
        errorMessage.includes('gas estimation failed') ||
        errorMessage.includes('out of gas') ||
        errorReason.includes('gas')) {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.GAS_ERROR], ErrorCodes.GAS_ERROR, error);
    }

    // Network errors
    if (errorMessage.includes('network') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('fetch') ||
        errorName === 'NetworkError') {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.NETWORK_ERROR], ErrorCodes.NETWORK_ERROR, error);
    }

    // if (errorMessage.includes('0xfb8f41b2') ||
    //     errorMessage.includes('0x2fc50d60') ||
    //     errorMessage.includes('0x01c2999e') ||
    //     errorMessage.includes('0x9667a91e')) {
    //     return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INSUFFICIENT_ALLOWANCE], ErrorCodes.INSUFFICIENT_ALLOWANCE, error);
    // }

    // if (errorMessage.includes('0x590b7c5c') ||
    //     errorMessage.includes('0x2b2cba0c') ||
    //     errorMessage.includes('0xe450d38c')) {
    //     return new BlockchainError(ERROR_MESSAGES[ErrorCodes.INSUFFICIENT_FUNDS], ErrorCodes.INSUFFICIENT_FUNDS, error);
    // }

    // if (errorMessage.includes('0x69bc7226') ||
    //     errorMessage.includes('0xd8a03932') ||
    //     errorMessage.includes('0xe2f7b689')) {
    //     return new BlockchainError(ERROR_MESSAGES[ErrorCodes.NOT_APPROVED], ErrorCodes.NOT_APPROVED, error);
    // }

    // Contract errors (custom contract errors)
    if (errorMessage.includes('execution reverted') ||
        errorMessage.includes('contract error') ||
        errorMessage.includes('revert') ||
        errorName === 'ContractFunctionExecutionError' ||
        errorName === 'ContractFunctionRevertedError') {
        return new BlockchainError(ERROR_MESSAGES[ErrorCodes.CONTRACT_ERROR], ErrorCodes.CONTRACT_ERROR, error);
    }

    // Default unknown error
    return new BlockchainError(ERROR_MESSAGES[ErrorCodes.UNKNOWN_ERROR], ErrorCodes.UNKNOWN_ERROR, error);
};

// Main error handling middleware
export const withErrorHandling = (asyncFunction) => {
    return async (...args) => {
        try {
            return await asyncFunction(...args);
        } catch (error) {
            Logger.error('Blockchain operation error:', error);

            const parsedError = parseError(error);

            // Log the original error for debugging
            if (parsedError.originalError) {
                Logger.error('Original error:', parsedError.originalError);
            }

            throw parsedError;
        }
    };
};

// Specific error handler for buy operations
export const handleBuyOperation = (asyncFunction) => {
    return async (amount, minSheAmount, onStateChange, userAddress) => {
        try {
            return await asyncFunction(amount, minSheAmount, onStateChange, userAddress);
        } catch (error) {
            Logger.error('Buy operation error:', error);

            const parsedError = parseError(error);

            // Reset state on error
            onStateChange?.('idle');

            throw parsedError;
        }
    };
};

// Utility function to get user-friendly error message
export const getErrorMessage = (error) => {
    if (error instanceof BlockchainError) {
        return error.message;
    }

    // Fallback for non-BlockchainError instances
    const parsedError = parseError(error);
    return parsedError.message;
};

// Utility function to check if error is recoverable
export const isRecoverableError = (error) => {
    if (error instanceof BlockchainError) {
        return ![ErrorCodes.USER_REJECTED].includes(error.code);
    }
    return true;
};

// Utility function to check if error requires user action
export const requiresUserAction = (error) => {
    if (error instanceof BlockchainError) {
        return [
            ErrorCodes.INSUFFICIENT_FUNDS,
            ErrorCodes.INSUFFICIENT_ALLOWANCE,
            ErrorCodes.USER_REJECTED
        ].includes(error.code);
    }
    return false;
};

// Utility function to get error severity
export const getErrorSeverity = (error) => {
    if (error instanceof BlockchainError) {
        switch (error.code) {
            case ErrorCodes.USER_REJECTED:
                return 'info';
            case ErrorCodes.INSUFFICIENT_FUNDS:
            case ErrorCodes.INSUFFICIENT_ALLOWANCE:
                return 'warning';
            case ErrorCodes.NETWORK_ERROR:
            case ErrorCodes.CONTRACT_ERROR:
                return 'error';
            default:
                return 'error';
        }
    }
    return 'error';
};

/*
USAGE EXAMPLES:

1. Basic usage with withErrorHandling:
```javascript
import { withErrorHandling, getErrorMessage } from '@/utils/errorHandler';

const myFunction = withErrorHandling(async (param) => {
    // Your async function logic here
    return await someBlockchainOperation(param);
});

// Usage
try {
    const result = await myFunction('someParam');
} catch (error) {
    console.log(getErrorMessage(error)); // User-friendly error message
}
```

2. Buy operation with state management:
```javascript
import { handleBuyOperation, getErrorMessage } from '@/utils/errorHandler';

const buyTokens = handleBuyOperation(async (amount, onStateChange) => {
    onStateChange('approving');
    await approveTokens(amount);
    
    onStateChange('purchasing');
    return await purchaseTokens(amount);
});

// Usage
try {
    const txHash = await buyTokens(100, (state) => {
        setPurchaseState(state);
    });
} catch (error) {
    setError(getErrorMessage(error));
    setPurchaseState('idle');
}
```

3. Error handling in React components:
```javascript
import { getErrorMessage, getErrorSeverity, requiresUserAction } from '@/utils/errorHandler';

const handlePurchase = async () => {
    try {
        const result = await buyWithETH(amount);
        // Handle success
    } catch (error) {
        const message = getErrorMessage(error);
        const severity = getErrorSeverity(error);
        const needsAction = requiresUserAction(error);
        
        // Show appropriate UI based on error type
        if (needsAction) {
            showActionRequiredModal(message);
        } else {
            showErrorToast(message, severity);
        }
    }
};
```
*/ 