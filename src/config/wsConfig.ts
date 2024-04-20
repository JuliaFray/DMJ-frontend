export const WS_URL = `ws://${process.env.REACT_APP_WS_URL}`;

export const isUserEvent = (message: any) => {
    const parsedMessage = JSON.parse(message.data);
    return parsedMessage.type === "userevent";
}

export const isDocumentEvent = (message: any) => {
    const parsedMessage = JSON.parse(message.data);
    return parsedMessage.type === "contentchange";
}
