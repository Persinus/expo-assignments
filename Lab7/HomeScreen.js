import React, { useState } from 'react';
import { View, TextInput, Image, ScrollView, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
const HomeScreen = ({ navigation }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const posts = [
    { id: 1, name: 'Châu Gia Huy', time: '5 tháng 2, 2022', text: 'Hiphop ne vờ đai', media: 'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/472273485_616173074119939_1369334787460278794_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHyMbOt6iHyKkFRV2oPkPOBHcYn8Mk2CsodxifwyTYKymAMb01iNfqAEu7b4WisNiz-dtIEdj6cVE0NvBLqZE1l&_nc_ohc=EnAPqrx0wm0Q7kNvgGqyt0V&_nc_oc=AdnYvjDOHkvCYeYCoYmhqbtA9z25mQ3mlJNyCbyUpHngPgcxGpwOLyS_VGriVPw-x9JkXnNVlULVahzhzTwLtYjJ&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=ShXHG1LX8UCs_zSSoEPytw&oh=00_AYGXB7EXbckTcAPUDkF273sYg1VmQ9v6_cG6RLs1YhyBww&oe=67EF7004', type: 'image', likes: 32 },
    { id: 2, name: 'Phan Đức Thọ', time: '23 tháng 11, 2018', text: 'maphite bất tử 😑', media: require('./assets/video.mp4'), type: 'video', likes: 46 },
    { id: 3, name: 'Phan Đức Thọ', time: '27 tháng 10, 2018', text: 'Hết Trò Ngồi Nghịch-🤣🤣🤣— đang  cảm thấy có động lực.', media: 'https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.6435-9/44877133_181146056104010_4358938523181514752_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=105&ccb=1-7&_nc_sid=536f4a&_nc_eui2=AeFpe0tYVsjLC5YWkU1UlzVOy5TSc-E1aXHLlNJz4TVpcZyj_osA0jy9U3f0pcS0S1dLERfP-RnjL55nY7Ka4kqd&_nc_ohc=a_kPuOL6j8oQ7kNvgEhQf8x&_nc_oc=AdlGF_IvDUixaTUTiQdsz_qdZktEzOPkqaS0Lm2UOUQ7tpzbLfY_TRHBn-jOJX63iO4VqUlnnruxiuGlh-QR5hjo&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=UrIdmB2RML5T4fTB65G9-Q&oh=00_AYGwuub7lstNNGBfDTNoNtBwdF9Y2fz8__0-3BFwI82K2A&oe=6810E695', type: 'image', likes: 285 }, 
    { id: 4, name: 'Châu Gia Huy', time: '20 tháng 2,2021', text: 'Mọi ng ơi cho em hỏi là hiện tại em mới mua đàn đc 3 tuần mà em đang muốn hc finger style mà em thấy anh này trên mạng đánh hay quá em có nên tập bài này đầu tiên để làm nền tảng ko ạ',  type: 'image',media:"https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.6435-9/150408256_906127400137876_5313115996441597159_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=536f4a&_nc_eui2=AeF51-M7oTptG2-SsWJiAKYM0RpRQG8A2s7RGlFAbwDazoA_07ezHCwV7lBT9OmrDzUM8UtbOm5EOZEijJ0nYq3g&_nc_ohc=A-jxPBKepV4Q7kNvgEcFbpx&_nc_oc=AdkKiJCX8GwCvy_lSfdMPVnXkjiWeC6mX5_9LV4BhRMv3ADy_4dncWyfo3afAiFSeZsDLyVRHQ0FJcIvlkvMlU04&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=C0lRi4e4INTxtMYdSFq8Fw&oh=00_AYHt1LOvRhPS-q9WSkz9ZCuCpofuFkNA-81E96RgP-cj8g&oe=681102FE", likes: 15 },
  ];
  const storyImages = [
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/476207844_940726431498566_2332264290920082861_n.jpg?stp=c300.0.1448.1448a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=52bb43&_nc_eui2=AeErCICznsj2qBiU3Sj38guAJ371z8_HzVsnfvXPz8fNW0p4cIxX4HxRv0SSIFSIlS7yGeIWNbqCkdpKJ-Iw2bqH&_nc_ohc=zmIOqv1D2ioQ7kNvgFgclGc&_nc_oc=AdnIrXtXOSgFRCzX7n87ppXqwwC61URhERLCHNT6QB--dA0W5iEsoWJ0of8DOH4-aU2GDQFOffbXj8PR3qSI6c3s&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=f2V2GeyrS_6rPwskFpRbwQ&oh=00_AYGL3ssF9jCtrDpGfPiuOHTAtxxw2bzLxYQ_zlkYKqYQ0w&oe=67EF3FAD',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/471192876_906715354899674_2137477718228608550_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=109&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeFwTg2YLfmX-6k67pqlGMl-Seh5hTMthNtJ6HmFMy2E2-w8IJbi264R3suR4QIg377bXGSeaYUd3SPlxDDRykJy&_nc_ohc=SZFvy9KiJZgQ7kNvgFGxXwp&_nc_oc=AdmwBuDDWewsbYBKP8HVHAvOLrqmvLhSNzFzdxoacMbKjDyaSYhV0Gkrxt-KoLLI7VaIAnqMu7i6-7hiFj9N-5uL&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=KBecfH5ePdnom_JmjzVRfQ&oh=00_AYFMN7KTIK3Z_PxqdSiCYCuECR6noVJtW2XbnVQhG_WJDQ&oe=67EF559F',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/471545053_910614667843076_7433421614484217591_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeGg0N_0l20vDZIVTVb1CAsQiHPdaMxbOUyIc91ozFs5TOLKOwy6pubsCeOE-Vwxm78TBsA6wmOS-6u7ZiN-nql7&_nc_ohc=teyf3PgcLc0Q7kNvgFahuGY&_nc_oc=Adm7k9Gd81R57jADWUTgXVjpA5rBfF2-aftFWMXgjbhKKsBLVJ5naV3woxWJOKJ55mhr0mEl8FF12vU2KDItqjRW&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=WyRvqaDyaPkhwgTcyUt1ow&oh=00_AYHQO_cZg3hPVpEQK_e9ZDfXvzDEWRURGY-w619NoRm1Qg&oe=67EF3F00',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/475280789_932640185640524_6778680401796199775_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=fe5ecc&_nc_eui2=AeF1m_zNcPcDfA5m7YLF7ID6aMJ6jtwjMY1ownqO3CMxjREncUuhM_0vKXNioIxIPJLuXEqJC_-PIKwgeNmwt36t&_nc_ohc=JQMTDvMF22sQ7kNvgGltg_j&_nc_oc=AdkpKbFQLnOHZHLFXj8aetmzi3rsKZxyD1wllLxFBMmDhX5PtaDh3v3SEC7TXWgdGxITjLw6FlE5_IEu21ozQ3I1&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=WyRvqaDyaPkhwgTcyUt1ow&oh=00_AYGCovk-Mt4y_bQQLXnaU_wzxpIxQ7XvbUFyCcEkRdwbkg&oe=67EF4B78'
  ];
  const profileImages = [
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-1/313364536_199978672406050_4251042519200581599_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGxzad4ebKGQSEr4NHn27H392CQeGrDDa33YJB4asMNrUEc4lbpB1dNYVgrAIiFUQqK4PIdFu0Mv7GEb7_ioEgv&_nc_ohc=HPEw2C8AgDwQ7kNvgHJwqUs&_nc_oc=AdkmfUahYmMmmnvjmhB13uyut3lr7GVEPA_4tQQkOpMtPjIbdXP46oUqJ61X_k669GB0gMse39jnKJlf8PY1CvpO&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=_IOwGAMYjJN-wd10_-reRQ&oh=00_AYGdcHUSToAolEoUiZ3MNSmwkNODpF0_KwiyHqcq08PNqg&oe=67EF623E',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=b224c7&_nc_eui2=AeECcTJLIN9D6dp44pvySP5_Wt9TLzuBU1Ba31MvO4FTUFkO7TLnk1AtXCMySPTo3X2jpXLN8bsNh2BCL6Ne1ZZQ&_nc_ohc=a1K6_KaoqeEQ7kNvgFKZ2RP&_nc_oc=AdlzZl3E-DX50SuOrxI_GuE9UxsR8F3fR3dKfS3MT09u6uaZfYLkrNc7UnjI660mMPfiXJ_azKofUEp7WH0gYaWZ&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&oh=00_AYH2Bq1vvtjr9qYwIHmOaIgnTHY-qGctKEPZvXbEVFTJ8w&oe=6811043A',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=b224c7&_nc_eui2=AeECcTJLIN9D6dp44pvySP5_Wt9TLzuBU1Ba31MvO4FTUFkO7TLnk1AtXCMySPTo3X2jpXLN8bsNh2BCL6Ne1ZZQ&_nc_ohc=a1K6_KaoqeEQ7kNvgFKZ2RP&_nc_oc=AdlzZl3E-DX50SuOrxI_GuE9UxsR8F3fR3dKfS3MT09u6uaZfYLkrNc7UnjI660mMPfiXJ_azKofUEp7WH0gYaWZ&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&oh=00_AYH2Bq1vvtjr9qYwIHmOaIgnTHY-qGctKEPZvXbEVFTJ8w&oe=6811043A',
    'https://scontent.fsgn20-1.fna.fbcdn.net/v/t1.6435-1/119882217_798991240851493_1310066282152830551_n.jpg?stp=c204.0.1224.1224a_dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFO5AICPuvjaey6swsP5d4U89F-ZxkI2nXz0X5nGQjaddyQFXhaM5Fc2MHcotllgiMwGh88KUDFRHrCpnjCy0Ce&_nc_ohc=DCVK8d6QVVMQ7kNvgFbwljg&_nc_oc=AdmsvKxSxjpgC1824KEMCw2eIskqhPGUrc6nD7dT6Fp5RIpKKsKSbkNxNZcsEYkKSZ9EYAc-U4E5PNAiVmhxfXoO&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=C0lRi4e4INTxtMYdSFq8Fw&oh=00_AYGgjQO_FL7vWuQsJ3XjJ7619j195gaiHyFhE-uQ0NN0HQ&oe=6810EC5D'
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-1/476970861_1080285503865142_7789741358459476707_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFJRwjwZf6omX-XlBKGm55r-1iWRZmXwWL7WJZFmZfBYvjdI98DAsCQ6nO0WeZZdAOwbY54fubIWuyQPedxkGsG&_nc_ohc=asynCgF8grIQ7kNvgFPwHEp&_nc_oc=AdlZIwgvStqkE7vKhWKmcrXG5wDySIiHI6OqbR0YSMlORHMYs0M8isrcg6yldpfyfCQSA9JG7CEveUwg9LNZoYqx&_nc_zt=24&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=RUoKOrH4RnMsZ_7DYUBLnA&oh=00_AYH5qu8uafbnQl-jKU4Xr3tzpz1RjFJwq2agGUkW_gUYDQ&oe=67EF5705' }} style={styles.avatar} />
        <TextInput style={styles.searchInput} placeholder="Bạn đang nghĩ gì?" />
        <TouchableOpacity onPress={() => setNotificationVisible(!notificationVisible)}>
          <MaterialIcon name="notifications" size={25} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcon name="logout" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {notificationVisible && (
        <View style={styles.notificationList}>
          <Text style={styles.notificationItem}>Bạn có một thông báo mới!</Text>
          <Text style={styles.notificationItem}>Ai đó đã thích bài viết của bạn.</Text>
        </View>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesSection}>
        {storyImages.map((image, index) => (
          <View key={index} style={styles.story}>
            <Image source={{ uri: image }} style={styles.storyImage} />
            <Text style={styles.storyText}>Hoàng Phan</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.postSection}>
  {posts.map((post, index) => (
    <View key={post.id} style={styles.post}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: profileImages[index % profileImages.length] }}
          style={styles.postProfileImage}
        />
        <View>
          <Text style={styles.postProfileName}>{post.name}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.text}</Text>

      {/* Kiểm tra loại phương tiện (image/video) */}
      {post.type === 'image' ? (
        <Image source={{ uri: post.media }} style={styles.postImage} />
      ) : post.type === 'video' ? (
        <Video
        source={post.media} // Không cần {{ uri: ... }} khi dùng require()
        style={styles.postVideo}
        useNativeControls
        resizeMode="contain"
        shouldPlay={true}
        autoplay={true}
        loop = {true}
      />
      ) : null}

      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => handleLike(post.id)} style={styles.actionButton}>
          <Icon
            name={likedPosts[post.id] ? 'heart' : 'heart-o'}
            size={20}
            color={likedPosts[post.id] ? 'red' : 'black'}
          />
          <Text style={styles.actionText}>{post.likes + (likedPosts[post.id] ? 1 : 0)} lượt thích</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="comment-o" size={20} color="black" />
          <Text style={styles.actionText}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color="black" />
          <Text style={styles.actionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  ))}
</View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1877F2', paddingVertical: 10, paddingHorizontal: 15 },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  searchInput: { backgroundColor: '#fff', flex: 1, paddingHorizontal: 10, borderRadius: 20, height: 35 },
  icon: { marginLeft: 10 },
  postSection: { paddingHorizontal: 10 },
  post: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center' },
  notificationItem: { paddingVertical: 5, fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  storiesSection: { flexDirection: 'row', paddingVertical: 10, backgroundColor: '#fff', marginTop: 5 },
  story: { alignItems: 'center', marginHorizontal: 8 },
  storyImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: '#1877F2' },
  storyText: { marginTop: 5, fontSize: 12, fontWeight: 'bold' },
  postProfileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postProfileName: { fontWeight: 'bold', fontSize: 14 },
  postTime: { fontSize: 12, color: 'gray' },
  notificationList: {
    position: 'absolute',
    top: 60, // Điều chỉnh vị trí xuống dưới header một chút
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Cho hiệu ứng nổi trên Android
    zIndex: 10, // Đảm bảo nó ở trên cùng
  },
  postVideo: { width: '100%', height: 200, borderRadius: 10 },
  postText: { marginVertical: 5, fontSize: 14 },
  postImage: { width: '100%', height: 200, borderRadius: 10 },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center' },
  actionText: { marginLeft: 5, fontSize: 14 },
});

export default HomeScreen;