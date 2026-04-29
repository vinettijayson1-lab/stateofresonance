"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
var axios_1 = require("axios");
// Retain visual formatters (no logic overrides, just aesthetic mapping)
var getLuxImage = function (handle, originalImage) {
    // Luxury esoteric occult background overrides — WebP for 88% size reduction
    var overrides = {
        'the-hermetic-scales-pullover': '/images/lookbook/20260426_150335.jpg',
        'the-hand-of-mysteries-pullover': '/images/lookbook/20260426_150343.jpg',
        'the-awakened-hand-pullover-1': '/images/lookbook/20260426_150444.jpg',
        'urban-hoodie-9': '/images/lookbook/20260426_150530.jpg',
        'oversized-faded-t-shirt-1': '/images/lookbook/20260426_150732.jpg',
        'unisex-garment-dyed-heavyweight-t-shirt-3': '/images/lookbook/20260426_150747.jpg',
        'unisex-garment-dyed-heavyweight-t-shirt-2': '/images/lookbook/20260426_151256-edit-20260429172132.jpg',
        'urban-hoodie-8': '/images/lookbook/20260426_151256.jpg',
        'urban-hoodie-7': '/images/lookbook/20260426_151344.jpg',
        'urban-hoodie-6': '/images/lookbook/20260426_151349.jpg',
        'unisex-garment-dyed-heavyweight-t-shirt': '/images/lookbook/20260426_151450.jpg',
        'urban-garment-dyed-hoodie-1': '/images/lookbook/20260426_151529-edit-20260429171533.jpg',
        'crop-hoodie': '/images/lookbook/20260426_151529.jpg',
        'women-s-relaxed-v-neck-t-shirt': '/images/lookbook/20260426_151538.jpg',
        'unisex-premium-sweatshirt': '/images/lookbook/20260426_152121-edit-20260429171606.jpg',
        'unisex-premium-mid-weight-hoodie-1': '/images/lookbook/20260426_152138.jpg',
        'unisex-oversized-hoodie': '/images/lookbook/20260426_152219-edit-20260429171820.jpg',
        'urban-hoodie-1': '/images/lookbook/20260426_152314.jpg',
        'og-crewnwck': '/images/lookbook/20260426_152340-edit-20260429171747.jpg',
        'men-s-box-hoodie': '/images/lookbook/20260426_152405.jpg',
        'her-resonance-hoodie': '/images/lookbook/20260426_152411.jpg',
        'celestial-alignment': '/images/lookbook/20260426_152525.jpg',
        'oversized-faded-t-shirt': '/images/lookbook/20260426_152532.jpg',
        'resonace': '/images/lookbook/20260426_152832.jpg',
        'sacred-heart': '/images/lookbook/20260426_152918.jpg',
    };
    return overrides[handle] || originalImage;
};
var detectCategory = function (title, type, tags) {
    if (tags === void 0) { tags = ''; }
    var t = (title + tags + type).toLowerCase();
    if (t.includes('hoodie') || t.includes('crewneck') || t.includes('shirt') || t.includes('apparel') || t.includes('tee'))
        return 'Attire';
    if (t.includes('pendant') || t.includes('ring') || t.includes('artifact') || t.includes('jewelry'))
        return 'Artifacts';
    if (t.includes('oil') || t.includes('mist') || t.includes('elixir'))
        return 'Alchemical Elixirs';
    if (t.includes('incense') || t.includes('botanical') || t.includes('herb'))
        return 'Alchemical Botanicals';
    if (t.includes('candle') || t.includes('light') || t.includes('illumination'))
        return 'Illuminations';
    if (t.includes('bowl') || t.includes('deck') || t.includes('tool'))
        return 'Ritual Tools';
    if (t.includes('ghost') || t.includes('bones'))
        return 'Ghost';
    return 'Apparel';
};
var detectType = function (title, type) {
    var t = title.toLowerCase();
    if (t.includes('hoodie'))
        return 'Hoodie';
    if (t.includes('crewneck'))
        return 'Crewneck';
    if (t.includes('shirt') || t.includes('tee'))
        return 'T-Shirt';
    if (t.includes('pendant'))
        return 'Pendant';
    return type || 'Apparel';
};
var getModelImage = function (handle, title) {
    // If specific items require secondary modeling hover states
    if (title.toLowerCase().includes('solfeggio'))
        return '/assets/luxury/solfeggio_model.png';
    if (title.toLowerCase().includes('omniscience'))
        return '/assets/luxury/omniscience_model.png';
    return null;
};
var SHOPIFY_DOMAIN = 'state-of-resonance.myshopify.com';
var AXIOS_CONFIG = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
    },
    timeout: 8000
};
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, category, type, handle_1, collection, limit, data, page, hasMore, shopifyUrl, shopifyRes, chunk, mapped, filterCat_1, col, singleProduct, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _a = req.query, category = _a.category, type = _a.type, handle_1 = _a.handle, collection = _a.collection;
                    limit = parseInt(req.query.limit) || 250;
                    data = [];
                    page = 1;
                    hasMore = true;
                    _c.label = 1;
                case 1:
                    if (!hasMore) return [3 /*break*/, 3];
                    shopifyUrl = "https://".concat(SHOPIFY_DOMAIN, "/products.json?limit=250&page=").concat(page, "&t=").concat(Date.now());
                    return [4 /*yield*/, axios_1.default.get(shopifyUrl, AXIOS_CONFIG)];
                case 2:
                    shopifyRes = _c.sent();
                    if (!shopifyRes || shopifyRes.status !== 200 || !((_b = shopifyRes.data) === null || _b === void 0 ? void 0 : _b.products)) {
                        if (page === 1)
                            return [2 /*return*/, res.status(500).json({ error: 'Shopify Sync Offline' })];
                        return [3 /*break*/, 3];
                    }
                    chunk = shopifyRes.data.products;
                    data.push.apply(data, chunk);
                    if (chunk.length < 250 || page >= 5) {
                        hasMore = false;
                    }
                    else {
                        page++;
                    }
                    return [3 /*break*/, 1];
                case 3:
                    mapped = data.filter(function (p) { return p.handle; }).map(function (p) {
                        var _a, _b, _c, _d, _e, _f, _g;
                        var tagsStr = (Array.isArray(p.tags) ? p.tags.join(',') : String(p.tags || '')).toLowerCase();
                        var isMembersOnly = tagsStr.includes('locked') || tagsStr.includes('vault') || tagsStr.includes('membersonly') || p.title.toLowerCase().includes('vault');
                        var categoryStr = detectCategory(p.title || '', p.product_type || '', tagsStr);
                        var rawPrice = ((_b = (_a = p.variants) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.price) ? String(p.variants[0].price) : 'TBA';
                        if (rawPrice !== 'TBA' && !rawPrice.includes('$'))
                            rawPrice = "$".concat(rawPrice);
                        // Optimize images (strip Shopify sizing params for HQ)
                        var optimizedImages = (p.images || []).map(function (img) { return ({
                            src: img.src.replace(/(\.[a-z]+)\?.*$/, '$1'),
                            alt: img.alt || '',
                            position: img.position || 99
                        }); });
                        // FRONT-FACING IMAGE PRIORITY:
                        // 1. Our curated override (photoshoot image) — highest quality
                        // 2. Image with 'front' in alt text or filename from Shopify
                        // 3. First image (Shopify default)
                        var frontImage = optimizedImages.find(function (img) {
                            return (img.alt || '').toLowerCase().includes('front') ||
                                (img.src || '').toLowerCase().includes('front');
                        });
                        var primaryRawImage = ((_c = (frontImage || optimizedImages[0])) === null || _c === void 0 ? void 0 : _c.src) || '/assets/placeholder.png';
                        var primaryImage = getLuxImage(p.handle, primaryRawImage);
                        return {
                            id: p.id ? p.id.toString() : Math.random().toString(36).substring(7),
                            title: p.title,
                            handle: p.handle || '',
                            price: rawPrice,
                            image: primaryImage,
                            category: categoryStr,
                            type: detectType(p.title || '', p.product_type || ''),
                            variantId: ((_e = (_d = p.variants) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.id) ? p.variants[0].id.toString() : null,
                            variants: (p.variants || []).map(function (v) {
                                var _a;
                                var vPrice = v.price ? String(v.price) : rawPrice;
                                if (vPrice !== 'TBA' && !vPrice.includes('$'))
                                    vPrice = "$".concat(vPrice);
                                return {
                                    id: v.id ? v.id.toString() : null,
                                    title: v.title || 'Standard',
                                    price: vPrice,
                                    available: v.available !== false,
                                    inventory_quantity: (_a = v.inventory_quantity) !== null && _a !== void 0 ? _a : null,
                                    options: [v.option1, v.option2, v.option3].filter(Boolean)
                                };
                            }),
                            images: optimizedImages.map(function (img) { return img.src; }),
                            modelImage: getModelImage(p.handle, p.title),
                            options: p.options || [],
                            available: (_g = (_f = p.variants) === null || _f === void 0 ? void 0 : _f.some(function (v) { return v.available !== false; })) !== null && _g !== void 0 ? _g : true,
                            collections: [{ handle: 'all' }],
                            metadata: {
                                isMembersOnly: isMembersOnly,
                                minResonanceScore: isMembersOnly ? 111 : 0
                            }
                        };
                    });
                    // ----------------------------------------------------
                    // Deterministic Routing Filters (Decoupled from Turso)
                    // ----------------------------------------------------
                    if (category && category !== 'undefined') {
                        filterCat_1 = category.toString();
                        if (filterCat_1 === 'Alchemy') {
                            mapped = mapped.filter(function (p) { return p.category.includes('Alchemical') || p.category.includes('Illumination') || p.category.includes('Ritual'); });
                        }
                        else {
                            mapped = mapped.filter(function (p) { return p.category === filterCat_1; });
                        }
                    }
                    if (collection && collection !== 'undefined') {
                        col = Array.isArray(collection) ? collection[0].toLowerCase() : collection.toLowerCase();
                        if (col === 'attire') {
                            mapped = mapped.filter(function (p) { return p.category === 'Attire' || p.category === 'Apparel' || String(p.type).includes('Vault') || String(p.category).includes('Ghost'); });
                        }
                        else if (col === 'sanctuary') {
                            mapped = mapped.filter(function (p) { return ['Decor', 'Illuminations', 'Earth Relics', 'Artifacts', 'Boxes', 'Shrine'].includes(p.category); });
                        }
                        else if (col === 'manuscripts') {
                            mapped = mapped.filter(function (p) { return ['Esoteric', 'Books', 'Manuscripts'].includes(p.category); });
                        }
                        else if (col === 'alchemy') {
                            mapped = mapped.filter(function (p) { return ['Alchemical', 'Elixirs', 'Oils', 'Incense', 'Resin', 'Herbs', 'Illuminations', 'Ritual Tools'].includes(p.category); });
                        }
                        else if (col.includes('ghost')) {
                            mapped = mapped.filter(function (p) { return p.category === 'Ghost' || p.category === 'Attire' || p.category === 'Apparel' || p.title.toLowerCase().includes('ghost'); });
                        }
                        else if (col.includes('her') || col.includes('resonance')) {
                            mapped = mapped.filter(function (p) { return p.category === 'Attire' || p.category === 'Apparel'; });
                        }
                        else if (col === 'hoodies') {
                            mapped = mapped.filter(function (p) { return p.type === 'Hoodie' || p.title.toLowerCase().includes('hoodie'); });
                        }
                        else if (col === 'tees') {
                            mapped = mapped.filter(function (p) { return p.type === 'T-Shirt' || p.title.toLowerCase().includes('shirt') || p.title.toLowerCase().includes('tee'); });
                        }
                        else if (col === 'crewnecks') {
                            mapped = mapped.filter(function (p) { return p.type === 'Crewneck' || p.title.toLowerCase().includes('crewneck') || p.title.toLowerCase().includes('sweatshirt'); });
                        }
                        else if (col === 'accessories') {
                            mapped = mapped.filter(function (p) { return !['Hoodie', 'T-Shirt', 'Crewneck', 'Apparel', 'Attire'].includes(p.type) && !['Attire', 'Apparel', 'Ghost'].includes(p.category); });
                        }
                        else {
                            // Unknown collection — return all apparel as fallback
                            mapped = mapped.filter(function (p) { return ['Attire', 'Apparel', 'Ghost'].includes(p.category); });
                        }
                    }
                    // ----------------------------------------------------
                    // Individual Product Resolution
                    // ----------------------------------------------------
                    if (handle_1) {
                        singleProduct = mapped.find(function (p) { return p.handle === handle_1.toString(); });
                        if (singleProduct)
                            return [2 /*return*/, res.status(200).json(singleProduct)];
                        return [2 /*return*/, res.status(404).json({ error: 'Artifact not found. Please sync from Shopify.' })];
                    }
                    return [2 /*return*/, res.status(200).json(mapped.slice(0, Math.min(limit, mapped.length)))];
                case 4:
                    error_1 = _c.sent();
                    console.error('Storefront V2 Proxy Error:', error_1.message);
                    res.status(500).json({ error: 'Failed to synchronize with Shopify', details: error_1.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
