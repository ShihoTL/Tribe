//app/onboarding.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Mail,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  Wallet,
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import ScreenWrapper from '@/components/ScreenWrapper';

// Backend API base URL - update this to your actual backend URL
const API_BASE_URL = __DEV__
  ? 'http://192.168.163.117:8082' // Updated to match your Node.js server port
  : 'https://your-production-api.com';

export default function OnboardingScreen() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // Reduced to 3 steps since OTP is removed
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Animation values
  const slideAnimation = useSharedValue(0);

  useEffect(() => {
    slideAnimation.value = withTiming(step, { duration: 300 });
  }, [step]);

  // Create all animated styles at the top level
  const step1AnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slideAnimation.value,
      [0, 1, 2],
      [300, 0, -300],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      slideAnimation.value,
      [0.5, 1, 1.5],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      opacity,
      position: step === 1 ? 'relative' : 'absolute',
      width: '100%',
    };
  });

  const step2AnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slideAnimation.value,
      [1, 2, 3],
      [300, 0, -300],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      slideAnimation.value,
      [1.5, 2, 2.5],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      opacity,
      position: step === 2 ? 'relative' : 'absolute',
      width: '100%',
    };
  });

  const step3AnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      slideAnimation.value,
      [2, 3, 4],
      [300, 0, -300],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      slideAnimation.value,
      [2.5, 3, 3.5],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      opacity,
      position: step === 3 ? 'relative' : 'absolute',
      width: '100%',
    };
  });

  const handleCreateUser = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsCreatingAccount(true);
    try {
      console.log('Creating user with Privy:', `${API_BASE_URL}/create-user`);
      console.log('Request body:', { email: email.trim().toLowerCase() });

      const response = await fetch(`${API_BASE_URL}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user and wallet');
      }

      console.log('User and wallet created successfully:', data);
      setUserData(data.user);
      setStep(3);
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert(
        'Error',
        error instanceof Error
          ? error.message
          : 'Failed to create user and wallet'
      );
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleCompleteSetup = async () => {
    try {
      // Here you can store user data locally (AsyncStorage) or send to your main backend
      console.log('Account setup completed:', {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        privyUser: userData,
      });

      // You might want to store user data in AsyncStorage or context
      // Example:
      // await AsyncStorage.setItem('user', JSON.stringify({
      //   name: name.trim(),
      //   email: email.trim().toLowerCase(),
      //   privyUserId: userData.id,
      //   walletAddress: userData.linkedAccounts.find(acc => acc.type === 'wallet')?.address
      // }));

      router.replace('/(tabs)');
      resetForm();
    } catch (error) {
      console.error('Error completing setup:', error);
      Alert.alert('Error', 'Failed to complete setup. Please try again.');
    }
  };

  const handleExploreAsGuest = () => {
    router.replace('/(tabs)');
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter your display name');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleCreateUser();
    } else if (step === 3) {
      handleCompleteSetup();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3);
    } else {
      setIsSigningUp(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setUserData(null);
    slideAnimation.value = 1;
  };

  const renderStepContent = () => {
    return (
      <ScreenWrapper>
        <View style={styles.stepsContainer}>
          <Animated.View style={[styles.stepContainer, step1AnimatedStyle]}>
            <Text style={styles.stepTitle}>Your Display Name</Text>
            <Text style={styles.stepSubtitle}>
              Choose a name to represent you in the Tribe community
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.stepLabel}>Display Name</Text>
              <TextInput
                style={styles.stepInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your display name"
                placeholderTextColor={Colors.text.secondary}
                autoCapitalize="words"
                autoFocus={step === 1}
                maxLength={30}
              />
            </View>
            <Button
              title="Next"
              onPress={handleNextStep}
              style={styles.stepButton}
              disabled={!name.trim()}
            />
          </Animated.View>

          <Animated.View style={[styles.stepContainer, step2AnimatedStyle]}>
            <Text style={styles.stepTitle}>Your Email</Text>
            <Text style={styles.stepSubtitle}>
              We'll create your account and Solana wallet automatically using
              Privy
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.stepLabel}>Email</Text>
              <TextInput
                style={styles.stepInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={Colors.text.secondary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={step === 2}
              />
            </View>
            <Button
              title={
                isCreatingAccount
                  ? 'Creating Account...'
                  : 'Create Account & Wallet'
              }
              onPress={handleNextStep}
              style={styles.stepButton}
              disabled={!email.trim() || isCreatingAccount}
              icon={<Wallet size={20} color="#FFF" />}
              loading={isCreatingAccount}
            />
          </Animated.View>

          <Animated.View style={[styles.stepContainer, step3AnimatedStyle]}>
            <View style={styles.successContainer}>
              <Wallet size={48} color={Colors.accent.green || '#10B981'} />
              <Text style={styles.stepTitle}>All Set!</Text>
              <Text style={styles.stepSubtitle}>
                Your account and Solana wallet have been created successfully
                with Privy
              </Text>
            </View>

            <View style={styles.reviewContainer}>
              <Text style={styles.reviewLabel}>Display Name:</Text>
              <Text style={styles.reviewValue}>{name}</Text>

              <Text style={styles.reviewLabel}>Email:</Text>
              <Text style={styles.reviewValue}>{email}</Text>

              <Text style={styles.reviewLabel}>User ID:</Text>
              <Text style={styles.reviewValue}>
                {userData?.id || 'Created'}
              </Text>

              <Text style={styles.reviewLabel}>Wallet:</Text>
              <Text style={[styles.reviewValue, styles.verifiedText]}>
                ✓ Solana Smart Wallet Created
              </Text>

              {userData?.linkedAccounts?.find((acc) => acc.type === 'wallet')
                ?.address && (
                <>
                  <Text style={styles.reviewLabel}>Wallet Address:</Text>
                  <Text style={[styles.reviewValue, styles.walletAddress]}>
                    {(() => {
                      const address = userData.linkedAccounts.find(
                        (acc) => acc.type === 'wallet'
                      )?.address;
                      return address
                        ? `${address.slice(0, 8)}...${address.slice(-8)}`
                        : 'Creating...';
                    })()}
                  </Text>
                </>
              )}
            </View>

            <Button
              title="Complete Setup"
              onPress={handleCompleteSetup}
              style={styles.stepButton}
            />

            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy
              Policy. Your wallet is secured by Privy.
            </Text>
          </Animated.View>
        </View>
      </ScreenWrapper>
    );
  };

  if (isSigningUp) {
    return (
      <ScreenWrapper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={styles.container}
        >
          <LinearGradient
            colors={[Colors.background.primary, Colors.gradient.dark]}
            style={styles.container}
          >
            <ScrollView
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.stepHeader}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handlePrevStep}
                >
                  <ArrowLeft size={24} color={Colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.stepIndicator}>Step {step} of 3</Text>
              </View>
              {renderStepContent()}
            </ScrollView>
          </LinearGradient>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.background.primary, Colors.gradient.dark]}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
            }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={['transparent', Colors.gradient.dark]}
            style={styles.headerGradient}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tribes!</Text>
            <View style={styles.taglineContainer}>
              <Text style={styles.tagline}>Unite • Quest • Earn</Text>
              <Sparkles
                size={20}
                color={Colors.accent.orange}
                style={styles.sparkleIcon}
              />
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Join Tribes</Text>
                <Text style={styles.featureDescription}>
                  Connect with like-minded creators, Earn rewards through
                  collaboration, Get $VIBE tokens and NFTs with your secure
                  Solana wallet powered by Privy!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Sign Up with Email"
              onPress={() => setIsSigningUp(true)}
              style={styles.primaryButton}
              icon={<Mail size={20} color="#FFF" />}
            />
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleExploreAsGuest}
            >
              <Text style={styles.secondaryButtonText}>Explore as Guest</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    height: '45%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagline: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.secondary,
    marginRight: 8,
  },
  sparkleIcon: {
    marginTop: 2,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.accent.blue,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  stepIndicator: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  stepsContainer: {
    position: 'relative',
    minHeight: 400,
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  stepTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  stepLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  stepInput: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.text.primary,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  stepButton: {
    width: '100%',
    marginBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  reviewContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    marginBottom: 24,
  },
  reviewLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  reviewValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  verifiedText: {
    color: Colors.accent.green || '#10B981',
  },
  walletAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.accent.blue,
  },
  termsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: 16,
  },
});
