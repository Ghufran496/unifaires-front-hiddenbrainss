import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/utils/axios-config";

interface Contact {
  id: string;
  firstname: string;
  lastname: string;
  companyName?: string;
  model: string;
}

interface StateInt {
  chats: any[];
  find: any;
  loading: boolean;
  error: boolean;
  currentChat: any;
  contacts?: Contact[];
}

// Fetch all chat
export const fetchAllChats = createAsyncThunk(
  "chat/fetchAllChats",
  async () => {
    const response = await axiosInstance.get("/chat/my-chats");

    return response.data.data;
  }
);
export const searchContacts = createAsyncThunk(
  "chat/searchContacts",
  async (name: string) => {
    const response = await axiosInstance.get(
      `/general/search-name-chat/${name}`
    );

    return response.data.data;
  }
);

export const removeAddress = createAsyncThunk(
  "chat/removeAddress",
  async (addressId: any) => {
    await axiosInstance.delete(`/chats/${addressId}`);
    return addressId; // Return the deleted cart's ID for reference
  }
);

const initialState: StateInt = {
  chats: [],

  contacts: [],
  find: {},
  loading: false,
  error: false,
  currentChat: null,
};

export const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat(state, { payload }) {
      state.currentChat = payload.currentChat;
    },

    addToChats(state, { payload }) {
      state.chats.push(payload.chat);
    },

    resetContacts(state) {
      state.contacts = [];
    },

    addToMessage(state, { payload }) {
      state.currentChat.chatmessages.push(payload.chat);
    },

    updateChatNotification(state, { payload }) {
      console.log(payload);
      const chatIndex = state.chats.findIndex(
        (chat: any) => chat?.id === payload.chatId
      );

      console.log(chatIndex, "tthi sis chat iindex");

      console.log(state.chats[chatIndex]);

      if (chatIndex !== -1) {
        const chat = state.chats[chatIndex];
        console.log("inside if statment");
        const notificationIndex = chat.chatsnotifications.findIndex(
          (notif: any) => notif.id === payload.id
        );

        console.log("notifcation index", notificationIndex);

        if (notificationIndex !== -1) {
          chat.chatsnotifications[notificationIndex] = payload;
        } else {
          chat.chatsnotifications.push(payload);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChats.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllChats.pending, (state) => {})
      .addCase(fetchAllChats.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(searchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload.results;
        state.loading = false;
      })
      .addCase(searchContacts.pending, (state) => {})
      .addCase(searchContacts.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        // Remove the deleted course from the courses array
        state.chats = state.chats.filter(
          (course: any) => course.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(removeAddress.pending, (state) => {})
      .addCase(removeAddress.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  setCurrentChat,
  resetContacts,
  addToMessage,
  updateChatNotification,
} = chat.actions;

export default chat.reducer;
