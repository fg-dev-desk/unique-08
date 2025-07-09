# Documentación de Arquitectura de Views

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Basada%20en%20Features-blue?style=for-the-badge)
![Estado](https://img.shields.io/badge/Estado-Producción-green?style=for-the-badge)
![Mantenibilidad](https://img.shields.io/badge/Mantenibilidad-Alta-brightgreen?style=for-the-badge)

## Estructura de Directorios

```
src/views/
├── about/
│   ├── About.jsx
│   ├── AboutSection/
│   │   ├── AboutSection.jsx
│   │   ├── aboutSectionData.json
│   │   └── useAboutSection.js
│   ├── CounterSection/
│   │   ├── CounterSection.jsx
│   │   ├── counterSectionData.json
│   │   └── useCounterSection.js
│   ├── FaqSection/
│   │   ├── FaqSection.jsx
│   │   ├── faqData.json
│   │   └── useFaqSection.js
│   ├── HeroSection/
│   │   ├── HeroSection.jsx
│   │   ├── heroData.json
│   │   └── useHeroSection.js
│   ├── PartnerSection/
│   │   ├── PartnerSection.jsx
│   │   ├── partnerData.json
│   │   └── usePartnerSection.js
│   └── ServiceSection/
│       ├── ServiceSection.jsx
│       ├── serviceData.json
│       └── useServiceSection.js
├── auth/
│   ├── Auth.jsx
│   ├── LoginSection/
│   │   ├── LoginSection.jsx
│   │   ├── loginSectionData.json
│   │   └── useLoginSection.js
│   └── RegisterSection/
│       ├── RegisterSection.jsx
│       ├── registerSectionData.json
│       └── useRegisterSection.js
├── contact/
│   ├── Contact.jsx
│   ├── ContactForm/
│   │   ├── ContactForm.jsx
│   │   ├── contactFormData.json
│   │   └── useContactForm.js
│   ├── ContactHeader/
│   │   ├── ContactHeader.jsx
│   │   ├── contactHeaderData.json
│   │   └── useContactHeader.js
│   ├── ContactInfo/
│   │   ├── ContactInfo.jsx
│   │   ├── contactInfoData.json
│   │   └── useContactInfo.js
│   ├── ContactMap/
│   │   ├── ContactMap.jsx
│   │   ├── contactMapData.json
│   │   └── useContactMap.js
│   └── HeroSection/
│       ├── HeroSection.jsx
│       ├── heroData.json
│       └── useHeroSection.js
├── detail/
│   ├── Detail.jsx
│   ├── detailData.json
│   ├── useDetail.js
│   ├── BiddingHistory/
│   │   ├── BiddingHistory.jsx
│   │   ├── biddingHistoryData.json
│   │   └── useBiddingHistory.js
│   ├── CarComments/
│   │   ├── CarComments.jsx
│   │   ├── carCommentsData.json
│   │   └── useCarComments.js
│   ├── CarImages/
│   │   ├── CarImages.jsx
│   │   └── useCarImages.js
│   ├── CarInfo/
│   │   ├── CarInfo.jsx
│   │   ├── useCarInfo.js
│   │   └── BiddingInterface/
│   │       └── BiddingInterface.jsx
│   ├── CarTabs/
│   │   ├── CarTabs.jsx
│   │   └── useCarTabs.js
│   ├── RelatedCars/
│   │   ├── RelatedCars.jsx
│   │   └── useRelatedCars.js
│   └── hooks/
│       └── useCarDetail.js
├── home/
│   ├── Home.jsx
│   ├── CarArea/
│   │   ├── CarArea.jsx
│   │   ├── carAreaData.json
│   │   └── useCarArea.js
│   └── HeroSection/
│       ├── HeroSection.jsx
│       ├── heroData.json
│       └── useHeroSection.js
├── profile/
│   ├── Profile.jsx
│   ├── BillingInfoPage.jsx
│   ├── FavoritesPage.jsx
│   ├── MyListingsPage.jsx
│   ├── ProfileSettingsPage.jsx
│   ├── TransactionsPage.jsx
│   ├── BillingInfo/
│   │   ├── BillingInfo.jsx
│   │   ├── billingInfoData.json
│   │   └── useBillingInfo.js
│   ├── Favorites/
│   │   ├── Favorites.jsx
│   │   ├── favoritesData.json
│   │   └── useFavorites.js
│   ├── MyListings/
│   │   ├── MyListings.jsx
│   │   ├── myListingsData.json
│   │   └── useMyListings.js
│   ├── ProfileInfo/
│   │   ├── ProfileInfo.jsx
│   │   ├── profileInfoData.json
│   │   └── useProfileInfo.js
│   ├── ProfileLayout/
│   │   ├── ProfileLayout.jsx
│   │   ├── profileLayoutData.json
│   │   └── useProfileLayout.js
│   ├── ProfileSettings/
│   │   ├── ProfileSettings.jsx
│   │   ├── profileSettingsData.json
│   │   └── useProfileSettings.js
│   ├── ProfileSidebar/
│   │   ├── ProfileSidebar.jsx
│   │   ├── profileSidebarData.json
│   │   └── useProfileSidebar.js
│   └── Transactions/
│       ├── Transactions.jsx
│       ├── transactionsData.json
│       └── useTransactions.js
├── sell/
│   ├── Sell.jsx
│   ├── HeroSection/
│   │   ├── HeroSection.jsx
│   │   ├── heroData.json
│   │   └── useHeroSection.js
│   ├── SellConfirmation/
│   │   ├── SellConfirmation.jsx
│   │   ├── sellConfirmationData.json
│   │   └── useSellConfirmation.js
│   └── SellWizard/
│       ├── SellWizard.jsx
│       ├── sellWizardData.json
│       ├── useSellWizard.js
│       ├── CarInfo/
│       │   ├── CarInfo.jsx
│       │   ├── carInfoData.json
│       │   └── useCarInfo.js
│       ├── PersonalInfo/
│       │   ├── PersonalInfo.jsx
│       │   ├── personalInfoData.json
│       │   └── usePersonalInfo.js
│       └── PhotosInfo/
│           ├── PhotosInfo.jsx
│           ├── photosInfoData.json
│           └── usePhotosInfo.js
└── mocks.js
```

## Organización por Features

### Patrón de Organización

Cada feature sigue el siguiente patrón de organización:

```
feature/
├── Feature.jsx                # Componente principal
├── featureData.json          # Datos de configuración (opcional)
├── useFeature.js            # Hook personalizado (opcional)
└── SubSection/              # Subsecciones específicas
    ├── SubSection.jsx
    ├── subSectionData.json
    └── useSubSection.js
```

### Tipos de Archivos por Feature

| Tipo | Extensión | Propósito |
|------|-----------|-----------|
| Componente Principal | `.jsx` | Punto de entrada de la feature |
| Subsección | `.jsx` | Componentes específicos de la feature |
| Datos | `.json` | Configuración estática y contenido |
| Hook | `.js` | Lógica de negocio y estado |
| Página | `Page.jsx` | Páginas específicas del perfil |

### Features Principales

#### 1. About (6 secciones)
- AboutSection
- CounterSection
- FaqSection
- HeroSection
- PartnerSection
- ServiceSection

#### 2. Auth (2 secciones)
- LoginSection
- RegisterSection

#### 3. Contact (5 secciones)
- ContactForm
- ContactHeader
- ContactInfo
- ContactMap
- HeroSection

#### 4. Detail (6 secciones + hooks)
- BiddingHistory
- CarComments
- CarImages
- CarInfo (con BiddingInterface)
- CarTabs
- RelatedCars
- hooks/ (hooks compartidos)

#### 5. Home (2 secciones)
- CarArea
- HeroSection

#### 6. Profile (7 secciones + 6 páginas)
- BillingInfo
- Favorites
- MyListings
- ProfileInfo
- ProfileLayout
- ProfileSettings
- ProfileSidebar
- Transactions

#### 7. Sell (3 secciones)
- HeroSection
- SellConfirmation
- SellWizard (con 3 pasos)

### Estructura de Datos

Cada subsección que requiere datos estáticos incluye:
- `componentData.json` - Configuración y contenido
- `useComponent.js` - Hook para manejo de lógica
- `Component.jsx` - Componente de presentación

### Casos Especiales

#### Detail Feature
- Incluye carpeta `hooks/` para hooks compartidos
- `BiddingInterface` como subcomponente anidado

#### Profile Feature
- Páginas individuales: `BillingInfoPage.jsx`, `FavoritesPage.jsx`, etc.
- Componente principal `Profile.jsx`

#### SellWizard
- Formulario multi-paso con 3 secciones:
  - CarInfo
  - PersonalInfo
  - PhotosInfo

### Beneficios de esta Organización

1. **Modularidad**: Cada feature es independiente
2. **Consistencia**: Patrón uniforme en todas las features
3. **Mantenibilidad**: Fácil localización de archivos
4. **Escalabilidad**: Agregar nuevas features sin conflictos
5. **Separación de responsabilidades**: UI, lógica y datos separados

---

<div align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Arquitectura](https://img.shields.io/badge/Patrón-Basado%20en%20Features-blue?style=flat-square)
![Hooks](https://img.shields.io/badge/Hooks-Personalizados-green?style=flat-square)
![Datos](https://img.shields.io/badge/Datos-Configuración%20JSON-orange?style=flat-square)

</div>