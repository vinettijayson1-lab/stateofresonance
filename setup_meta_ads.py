import os
import sys

try:
    from facebook_business.api import FacebookAdsApi
    from facebook_business.adobjects.adaccount import AdAccount
    from facebook_business.adobjects.campaign import Campaign
    from facebook_business.adobjects.adset import AdSet
    from facebook_business.adobjects.targeting import Targeting
    from facebook_business.adobjects.targetingsearch import TargetingSearch
except ImportError:
    print("FATAL: facebook_business SDK is not installed.")
    print("Please run: pip install facebook_business")
    sys.exit(1)

# ==========================================
# META MARKETING API CREDENTIALS
# ==========================================
# YOU MUST FILL THESE IN BEFORE RUNNING
ACCESS_TOKEN = os.environ.get('META_ACCESS_TOKEN', 'YOUR_META_ACCESS_TOKEN_HERE')
APP_SECRET = os.environ.get('META_APP_SECRET', 'YOUR_META_APP_SECRET_HERE')
APP_ID = os.environ.get('META_APP_ID', 'YOUR_META_APP_ID_HERE')
AD_ACCOUNT_ID = os.environ.get('META_AD_ACCOUNT_ID', 'act_1661271854897444')

if 'YOUR_' in ACCESS_TOKEN or 'YOUR_' in AD_ACCOUNT_ID:
    print("ERROR: You must insert your Meta API keys into the script before pressing 'run'.")
    sys.exit(1)

FacebookAdsApi.init(APP_ID, APP_SECRET, ACCESS_TOKEN)
account = AdAccount(AD_ACCOUNT_ID)

print("Authenticating with Meta Graph API...")

# ==========================================
# 1. CREATE CORE CAMPAIGN
# ==========================================
print("Creating Campaign: State of Resonance V3 Conversions")
campaign = Campaign(parent_id=AD_ACCOUNT_ID)
campaign.update({
    Campaign.Field.name: 'State of Resonance - Conversions - V3 Launch',
    Campaign.Field.objective: 'OUTCOME_SALES', # Modern Conversions objective
    Campaign.Field.status: Campaign.Status.paused, # Paused so you can review it
    Campaign.Field.special_ad_categories: ['NONE'],
})
campaign.remote_create()
print(f"✅ Campaign created successfully! ID: {campaign['id']}")

# ==========================================
# 2. DEFINE AUDIENCE PILLARS
# ==========================================
print("Generating targeting criteria matching our 3 Pillars...")

# PILLAR 1: Esoteric x Streetwear
esoteric_interests = [
    {'id': '6003117564757', 'name': 'Alchemy'},
    {'id': '6003058863618', 'name': 'Sacred geometry'}
]
streetwear_interests = [
    {'id': '6003444855073', 'name': 'Streetwear'},
    {'id': '6003306644268', 'name': 'High fashion'}
]

targeting_pillar_1 = {
    Targeting.Field.age_min: 21,
    Targeting.Field.age_max: 40,
    Targeting.Field.geo_locations: {'countries': ['US', 'CA', 'GB', 'AU']},
    # Narrow targeting: Must match esoteric AND streetwear
    Targeting.Field.flexible_spec: [{'interests': esoteric_interests}],
    Targeting.Field.narrow_spec: [{'interests': streetwear_interests}]
}

# PILLAR 2: Transformation & Seekers
transformation_interests = [
    {'id': '6003080060000', 'name': 'Personal development'},
    {'id': '6003565023908', 'name': 'Meditation'}
]

targeting_pillar_2 = {
    Targeting.Field.age_min: 25,
    Targeting.Field.age_max: 45,
    Targeting.Field.geo_locations: {'countries': ['US', 'CA', 'GB', 'AU']},
    Targeting.Field.flexible_spec: [{'interests': transformation_interests}],
    Targeting.Field.behaviors: [{'id': '6002714896772', 'name': 'Engaged Shoppers'}]
}

# PILLAR 3: Scarcity Hypebeast
hype_interests = [
    {'id': '6003444855073', 'name': 'Streetwear'},
    {'id': '6004944521404', 'name': 'Hypebeast'}
]

targeting_pillar_3 = {
    Targeting.Field.age_min: 18,
    Targeting.Field.age_max: 35,
    Targeting.Field.geo_locations: {'countries': ['US', 'CA', 'GB', 'AU']},
    Targeting.Field.flexible_spec: [{'interests': hype_interests}],
}

# ==========================================
# 3. CREATE AD SETS
# ==========================================
def create_ad_set(name, targeting_spec):
    adset = AdSet(parent_id=AD_ACCOUNT_ID)
    adset.update({
        AdSet.Field.name: name,
        AdSet.Field.campaign_id: campaign['id'],
        AdSet.Field.daily_budget: 2000, # $20.00 daily budget per adset
        AdSet.Field.billing_event: AdSet.BillingEvent.impressions,
        AdSet.Field.optimization_goal: AdSet.OptimizationGoal.offsite_conversions,
        AdSet.Field.bid_amount: 200,
        AdSet.Field.targeting: targeting_spec,
        AdSet.Field.status: AdSet.Status.paused,
    })
    try:
        adset.remote_create()
        print(f"✅ AdSet created: {name} (ID: {adset['id']})")
    except Exception as e:
        print(f"⚠️ Failed to create AdSet {name}: {e}")

print("Deploying Ad Sets to Meta...")
create_ad_set('Pillar 1: Esoteric Aesthetics', targeting_pillar_1)
create_ad_set('Pillar 2: Conscious Transformation', targeting_pillar_2)
create_ad_set('Pillar 3: The Scarcity Hypebeast', targeting_pillar_3)

print("\n==================================")
print("SUCCESS: Your foundational Meta Campaign structure has been automatically built.")
print("- The Campaign objective is set to Sales/Conversions.")
print("- 3 highly segmented Ad Sets have been configured with Advanced Targeting.")
print("- Everything is currently PAUSED.")
print("NEXT STEP: Go to adsmanager.facebook.com, review the new setup, upload your video creatives/images into the Ad Sets, and click Publish!")
print("==================================")
