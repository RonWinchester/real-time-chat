export class Api {
  constructor({ adress }) {
    this._adress = adress;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`)
  }

  loginUser(userName, roomId) {
    return fetch(`${this._adress}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        roomId: roomId,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getUserData(roomID) {
      return fetch(`${this._adress}${roomID}`, {
        
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
      }).then((res) => {
        return this._getResponseData(res);
      });
  }
}
